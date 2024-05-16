import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { courseModel } from '../models/course.model'
import { orderModel } from '../models/order.model'
import { cartModel } from '../models/cart.model'

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

		// @ts-ignore Data is being populated, so total can be calculated
		const total = cart?.courses.reduce((acc, course) => acc + course.price, 0)

		const orderObject = {
			user: token._id,
			courses: cart?.courses,
			total,
		}

		// Create order
		const order = await orderModel.create(orderObject)

		// Delete cart
		await cartModel.deleteMany({ user: token._id })

		return c.json({ ok: true, message: 'Order created successfully', order })
	}
)

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

		const orderObject = {
			user: token._id,
			courses: [course._id],
			total: course.price,
		}

		const order = await orderModel.create(orderObject)

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

export default orderRoutes
