import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { courseModel } from '../models/course.model'
import { orderModel } from '../models/order.model'
import { cartModel } from '../models/cart.model'
import { razorpayOrderType, razorpayPayment } from '../config/payment'

const orderRoutes = new Hono()

// Buy cart
orderRoutes.post(
	'/buy-cart',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')

		// If the user is not logged in, return error
		if (!token) {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		const cart = await cartModel
			.findOne({ user: token._id })
			.populate('courses')

		// If the cart is empty, return error
		if (!cart || cart?.courses.length === 0) {
			return c.json({ ok: false, message: 'Cart is empty' }, 400)
		}

		// @ts-ignore Data is being populated, so total can be calculated
		const total = cart?.courses.reduce((acc, course) => acc + course.price, 0)

		// Razorpay
		const razorpayOrder: razorpayOrderType | any = await razorpayPayment(
			total as number
		)

		const orderObject = {
			user: token._id,
			courses: cart?.courses,
			total,
			paymentId: razorpayOrder.id,
			status: 'pending',
		}

		// Create order
		const order = await orderModel.create(orderObject)

		// Update courses
		await courseModel.updateMany(
			{ _id: { $in: cart?.courses } },
			{ $push: { students: token._id } }
		)

		// Delete cart
		await cartModel.deleteMany({ user: token._id })

		return c.json({ ok: true, message: 'Order created successfully', order })
	}
)

// Verify payment
orderRoutes.post('/verify', async (c) => {
	const body = await c.req.json()
	const paymentId = body.razorpay_payment_id
	const id = body.id

	await orderModel.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				paymentId,
				status: 'completed',
			},
		},
		{ new: true }
	)

	return c.json({ ok: true, message: 'Payment verified successfully' })
})

// Buy now
orderRoutes.post(
	'/:id',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')
		const id = c.req.param('id')

		// If the user is not logged in, return error
		if (!token) {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		// If the course is not found, return error
		const course = await courseModel.findOne({ _id: id })
		if (!course) {
			return c.json({ ok: false, message: 'Course not found' }, 404)
		}

		// If the user already bought the course, return error
		const orderExists = await orderModel.findOne({
			user: token._id,
			courses: id,
		})
		if (orderExists) {
			return c.json({ ok: false, message: 'Course already purchased' }, 200)
		}

		// Razorpay
		const razorpayOrder: razorpayOrderType | any = await razorpayPayment(
			course.price as number
		)

		const orderObject = {
			user: token._id,
			courses: [course._id],
			total: course.price,
			paymentId: razorpayOrder.id,
			status: 'pending',
		}

		const order = await orderModel.create(orderObject)

		// Update course students
		course.students.push(token._id)
		await course.save()

		return c.json(
			{ ok: true, message: 'Order created successfully', order },
			200
		)
	}
)

// Get all orders
orderRoutes.get('/', jwt({ secret: process.env.JWT_SECRET! }), async (c) => {
	const token = c.get('jwtPayload')
	if (!token) {
		return c.json({ ok: false, message: 'Unauthorized' }, 401)
	}

	const orders = await orderModel.find({ user: token._id }).populate('courses')

	return c.json({ ok: true, orders })
})

// Get a single order
orderRoutes.get('/:id', jwt({ secret: process.env.JWT_SECRET! }), async (c) => {
	const token = c.get('jwtPayload')
	const id = c.req.param('id')

	// If the user is not logged in, return error
	if (!token) {
		return c.json({ ok: false, message: 'Unauthorized' }, 401)
	}

	const order = await orderModel.findOne({ _id: id }).populate('courses')

	return c.json({ ok: true, order })
})

export default orderRoutes
