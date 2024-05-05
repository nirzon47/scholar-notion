import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { z } from 'zod'
import { profileModel } from '../models/profile.model'
import { zValidator } from '@hono/zod-validator'

const profileRoutes = new Hono()

// Zod schemas
const profileSchema = z.object({
	gender: z.enum(['male', 'female', 'other']).optional(),
	dob: z.date().optional(),
	about: z.string().optional(),
	contactNumber: z.string().optional(),
})

// Update profile
profileRoutes.put(
	'/',
	jwt({ secret: process.env.JWT_SECRET! }),
	zValidator('json', profileSchema),
	async (c) => {
		// Parse token
		const token = c.get('jwtPayload')
		// Parse body
		const body = await c.req.json()

		const profile = await profileModel.findOne({ user: token._id })

		// If a profile exists, update it, otherwise create a new one
		let updatedProfile
		if (!profile) {
			updatedProfile = await profileModel.create({
				user: token._id,
				...body,
			})
		} else {
			updatedProfile = await profileModel.findOneAndUpdate(
				{ user: token._id },
				{
					$set: {
						...body,
					},
				},
				{ new: true }
			)
		}

		// Send response
		return c.json(
			{
				ok: true,
				message: 'Profile updated successfully.',
				profile: updatedProfile,
			},
			200
		)
	}
)

export default profileRoutes
