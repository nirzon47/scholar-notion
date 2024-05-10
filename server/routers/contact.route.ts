import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { contactModel } from '../models/contact.model'
import { jwt } from 'hono/jwt'

const contactRoute = new Hono()

const contactSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	message: z.string(),
})

contactRoute.post('/', zValidator('json', contactSchema), async (c) => {
	const body = await c.req.json()

	await contactModel.create({
		name: body.name,
		email: body.email,
		message: body.message,
	})

	return c.json({ ok: true, message: 'Message sent successfully.' }, 201)
})

contactRoute.get('/', jwt({ secret: process.env.JWT_SECRET! }), async (c) => {
	const contacts = await contactModel.find()
	const token = c.get('jwtPayload')

	if (token.role !== 'admin')
		return c.json({ ok: false, message: 'Unauthorized' }, 403)

	return c.json({ ok: true, contacts }, 200)
})

export default contactRoute
