import { Hono } from 'hono'
import { courseModel } from '../models/course.model'
import { profileModel } from '../models/profile.model'
import { jwt } from 'hono/jwt'

const courseRoutes = new Hono()

// Get purchased courses
courseRoutes.get(
	'/purchased',
	jwt({ secret: process.env.JWT_SECRET! }),
	async (c) => {
		const token = c.get('jwtPayload')

		const courses = await courseModel
			.find({ students: token._id })
			.populate('instructor', 'name _id email')

		return c.json({ ok: true, courses }, 200)
	}
)

// Get a specific course
courseRoutes.get('/:id', async (c) => {
	const id = c.req.param('id')

	const course = await courseModel
		.findOne({ _id: id })
		.populate('students', 'name _id email')
		.populate(
			'instructor',
			'-password -tokens -courses -courseProgress -approved'
		)

	const profile = await profileModel
		.findOne({ user: course?.instructor })
		.select('-contactNumber')

	if (course && course.instructor) {
		// @ts-ignore
		course.instructor.profile = profile
	}

	return c.json({ ok: true, course }, 200)
})

// Get all courses
courseRoutes.get('/', async (c) => {
	const courses = await courseModel.find()
	return c.json({ ok: true, courses }, 200)
})

// Find courses by tag
courseRoutes.get('/tag/:tag', async (c) => {
	const tag = c.req.param('tag')
	const courses = await courseModel.find()

	const filteredCourses = courses.filter((course) =>
		course.tags.toLowerCase().includes(tag.toLowerCase())
	)
	return c.json({ ok: true, courses: filteredCourses }, 200)
})

export default courseRoutes
