import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { courseModel } from '../models/course.model'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const addCourseSchema = z.object({
	name: z.string(),
	desc: z.string(),
	tags: z.string(),
	price: z.number(),
	thumbnail: z.string().optional(),
})

const teacherRoutes = new Hono()

// Add course
teacherRoutes.post(
	'/course',
	zValidator('json', addCourseSchema),
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')
		const body = await c.req.json()
		const { name, desc, tags, price, thumbnail } = body

		// If there is a token or the user is not a teacher, return error
		if (!token || token.role !== 'teacher') {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		// Create course
		const course = await courseModel.create({
			name,
			desc,
			instructor: token._id,
			tags,
			price,
			thumbnail,
		})

		return c.json(
			{ ok: true, message: 'Course created successfully', course },
			201
		)
	}
)

// Update course
teacherRoutes.patch(
	'/course/:id',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')
		const body = await c.req.json()
		const { name, desc, tags, price, thumbnail } = body
		const id = c.req.param('id')

		// If there is a token or the user is not a teacher, return error
		if (!token || token.role !== 'teacher') {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		// Create course
		const course = await courseModel.findOneAndUpdate(
			{ _id: id },
			{
				name,
				desc,
				tags,
				price,
				thumbnail,
			}
		)
		return c.json(
			{ ok: true, message: 'Course updated successfully', course },
			200
		)
	}
)

// Delete course
teacherRoutes.delete(
	'/course/:id',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')
		const id = c.req.param('id')

		// If there is a token or the user is not a teacher, return error
		if (!token || token.role !== 'teacher') {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		// Delete course
		await courseModel.deleteOne({ _id: id })

		return c.json({ ok: true, message: 'Course deleted successfully' }, 200)
	}
)

// Get teacher's courses
teacherRoutes.get(
	'/course',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')

		// If there is a token or the user is not a teacher, return error
		if (!token || token.role !== 'teacher') {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		// Get teacher's courses
		const courses = await courseModel
			.find({ instructor: token._id })
			.populate('students')

		return c.json({ ok: true, courses }, 200)
	}
)

export default teacherRoutes
