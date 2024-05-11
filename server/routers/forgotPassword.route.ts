import { Hono } from 'hono'
import { customAlphabet } from 'nanoid'
import { userModel } from '../models/user.model'
import { forgotPasswordModel } from '../models/forgot.model'
import { sendEmail } from '../config/email'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const resetPasswordSchema = z.object({
	password: z.string().min(8),
	token: z.string().length(6),
})

const forgotPasswordRoutes = new Hono()

forgotPasswordRoutes.post('/sendToken', async (c) => {
	const body = await c.req.json()

	const { email } = body

	// Check if email is provided
	if (!email) {
		return c.json({ ok: false, message: 'Email is required' }, 400)
	}

	// Check if the email has a user
	const user = await userModel.findOne({ email })
	if (!user) {
		return c.notFound()
	}

	// If the user has a generated token, delete it and make a new one
	const ifTokenExists = await forgotPasswordModel.findOne({ user: user._id })
	if (ifTokenExists) {
		await forgotPasswordModel.deleteOne({ user: user._id })
	}

	// Generate a token and expiry date
	const nanoid = customAlphabet('1234567890', 6)
	const token = nanoid()
	const expiry = new Date(Date.now() + 10 * 60 * 1000)

	await forgotPasswordModel.create({
		token,
		user: user._id,
		exp: expiry,
	})

	// Send email
	const subject = 'Verification Code for ScholarNotion - Forgot Password'
	const text = token

	await sendEmail(email, subject, text)

	return c.json({ ok: true, message: 'Email sent successfully' }, 200)
})

forgotPasswordRoutes.post('/verifyToken', async (c) => {
	const body = await c.req.json()

	// Check if token is provided
	const { token } = body
	if (!token) {
		return c.notFound()
	}

	// Check if token is valid
	const forgotPassword = await forgotPasswordModel.findOne({ token })
	if (!forgotPassword) {
		return c.json({ ok: false, message: 'Invalid token' }, 400)
	}

	// Check if token has expired
	if (forgotPassword.exp < new Date()) {
		return c.json({ ok: false, message: 'Token has expired' }, 400)
	}

	return c.json({ ok: true, message: 'Token is valid' }, 200)
})

forgotPasswordRoutes.post(
	'/resetPassword',
	zValidator('json', resetPasswordSchema),
	async (c) => {
		const body = await c.req.json()

		let { password, token } = body

		// Check if token is provided and is valid
		const forgotPassword = await forgotPasswordModel.findOne({ token })
		if (!forgotPassword) {
			return c.json({ ok: false, message: 'Invalid token' }, 400)
		}
		if (forgotPassword.exp < new Date()) {
			return c.json({ ok: false, message: 'Token has expired' }, 400)
		}

		// Hash password
		password = await Bun.password.hash(password)

		// Update password in MongoDB
		await userModel.findByIdAndUpdate(
			forgotPassword.user,
			{ password, tokens: null },
			{ new: true }
		)

		// Delete token
		await forgotPasswordModel.deleteOne({ token })

		// Send response
		return c.json({ ok: true, message: 'Password reset successfully' }, 200)
	}
)

export default forgotPasswordRoutes
