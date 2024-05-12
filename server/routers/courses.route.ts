import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { courseModel } from '../models/course.mode'

const courseRoutes = new Hono()

// Get a specific course
courseRoutes.get(
	'/:id',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')
		const id = c.req.param('id')

		if (!token || token.role !== 'teacher') {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		const course = await courseModel.findOne({ _id: id })

		if (course?.instructor !== token._id) {
			return c.json({ ok: false, message: 'Unauthorized' }, 401)
		}

		return c.json({ ok: true, course }, 200)
	}
)

// Get all courses
courseRoutes.get('/', async (c) => {
	const courses = await courseModel.find()
	return c.json({ ok: true, courses }, 200)
})

// Find courses by tag
courseRoutes.get('/tag/:tag', async (c) => {
	const tag = c.req.param('tag')
	const courses = await courseModel.find({ tags: { $in: [tag] } })
	return c.json({ ok: true, courses }, 200)
})

export default courseRoutes
