import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

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

// Register user
userRoutes.post(
	'/register',
	// Validate request body
	zValidator('json', registerSchema, (result, c) => {
		if (!result.success) {
			return c.json({ success: false, message: 'Validation error' }, 400)
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

export default userRoutes
