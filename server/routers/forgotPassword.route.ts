import { Hono } from 'hono'
import { customAlphabet } from 'nanoid'
import { userModel } from '../models/user.model'
import { forgotPasswordModel } from '../models/forgot.model'
import { sendEmail } from '../config/email'

const forgotPasswordRoutes = new Hono()

forgotPasswordRoutes.post('/sendToken', async (c) => {
	const body = await c.req.json()

	const { email } = body

	if (!email) {
		return c.json({ ok: false, message: 'Email is required' }, 400)
	}

	const user = await userModel.findOne({ email })

	if (!user) {
		return c.notFound()
	}

	const ifTokenExists = await forgotPasswordModel.findOne({ user: user._id })

	if (ifTokenExists) {
		await forgotPasswordModel.deleteOne({ user: user._id })
	}

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

export default forgotPasswordRoutes
