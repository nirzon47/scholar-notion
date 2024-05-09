import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { z } from 'zod'
import { profileModel } from '../models/profile.model'
import { zValidator } from '@hono/zod-validator'
import { userModel } from '../models/user.model'

const profileRoutes = new Hono()

// Zod schemas
const profileSchema = z.object({
	gender: z.enum(['male', 'female', 'other']).optional(),
	dob: z.string().optional(),
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

			await userModel.findOneAndUpdate(
				{ _id: token._id },
				{
					$set: {
						profile: updatedProfile._id,
					},
				},
				{ new: true }
			)
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
