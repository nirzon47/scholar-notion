import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { cartModel } from '../models/cart.model'
import { courseModel } from '../models/course.model'
import { orderModel } from '../models/order.model'

const cartRoutes = new Hono()

// Get cart of a user
cartRoutes.get('/', jwt({ secret: process.env.JWT_SECRET! }), async (c) => {
	const token = c.get('jwtPayload')

	const cart = await cartModel.findOne({ user: token._id }).populate('courses')

	return c.json({ ok: true, cart }, 200)
})

// Add course to cart
cartRoutes.post('/:id', jwt({ secret: process.env.JWT_SECRET! }), async (c) => {
	const token = c.get('jwtPayload')
	const id = c.req.param('id')

	const course = await courseModel.findOne({ _id: id })

	// If the course is not found, return error
	if (!course) {
		return c.notFound()
	}

	// If the course is already in the cart, return error
	let cart = await cartModel.findOne({ user: token._id })
	if (cart?.courses.includes(id as any)) {
		return c.json({ ok: false, message: 'Course already in cart' }, 200)
	}

	// If the user already bought the course, return error
	const order = await orderModel.findOne({ user: token._id, courses: id })
	if (order) {
		return c.json({ ok: false, message: 'Course already purchased' }, 200)
	}

	// If the course is not in the cart, create it
	if (!cart) {
		cart = await cartModel.create({
			user: token._id,
			courses: [id],
		})

		return c.json({ ok: true, cart }, 200)
	}

	// If the course is in the cart, add it to the cart
	cart = await cartModel.findOneAndUpdate(
		{ _id: cart._id },
		{ $push: { courses: id } },
		{ new: true }
	)

	return c.json({ ok: true, cart }, 200)
})

// Remove course from cart
cartRoutes.delete(
	'/:id',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')
		const id = c.req.param('id')

		const course = await courseModel.findOne({ _id: id })

		// If the course is not found, return error
		if (!course) {
			return c.notFound()
		}

		let cart = await cartModel.findOne({ user: token._id })

		// If the course is not in the cart, return error
		if (!cart) {
			return c.notFound()
		}

		// If the course is in the cart, remove it from the cart
		cart = await cartModel.findOneAndUpdate(
			{ _id: cart._id },
			{ $pull: { courses: id } },
			{ new: true }
		)

		return c.json({ ok: true, cart }, 200)
	}
)

export default cartRoutes
