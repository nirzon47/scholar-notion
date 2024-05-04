import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { sign } from 'jsonwebtoken'

import { userModel } from '../models/user.model'

const userRoutes = new Hono()

// Zod schemas
const roleEnum = z.enum(['admin', 'teacher', 'student'])
const registerSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	role: roleEnum.optional(),
})
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

// Register user
userRoutes.post(
	'/register',
	// Validate request body
	zValidator('json', registerSchema, (result, c) => {
		if (!result.success) {
			return c.json({ ok: false, message: 'Validation error' }, 400)
		}
	}),
	async (c) => {
		// Parse request body
		const body = await c.req.json()
		let { name, email, password, role } = body

		// Hash password
		password = await Bun.password.hash(password)

		// Create user in MongoDB
		const user = await userModel.create({ name, email, password, role })

		// Send response
		return c.json(
			{
				ok: true,
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			201
		)
	}
)

// Login user
userRoutes.post(
	'/login',
	// Validate request body
	zValidator('json', loginSchema, (result, c) => {
		if (!result.success) {
			return c.json({ ok: false, message: 'Validation error' }, 400)
		}
	}),
	async (c) => {
		// Parse request body
		const body = await c.req.json()
		const { email, password } = body

		// Find user in MongoDB
		const user = await userModel.findOne({ email })

		// Check if user exists
		if (!user) {
			return c.notFound()
		}

		// Check if password is correct
		const isMatch = await Bun.password.verify(password, user.password)
		if (!isMatch) {
			return c.json({ success: false, message: 'Incorrect password' }, 401)
		}

		// JWT
		const payload = {
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			exp: Math.floor(Date.now() / 1000) + 60 * 2,
		}
		const token = sign(payload, process.env.JWT_SECRET!)

		// Update token in MongoDB
		user.tokens = token
		await user.save()

		// Send response
		return c.json({ ok: true, token }, 200)
	}
)

export default userRoutes
