import { Schema, model } from 'mongoose'

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ['admin', 'teacher', 'student'],
		default: 'student',
	},
	approved: {
		type: Boolean,
		default: false,
	},
	courses: {
		type: [Schema.Types.ObjectId],
		ref: 'course',
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'profile',
	},
	courseProgress: {
		type: [Schema.Types.ObjectId],
		ref: 'courseProgress',
	},
	tokens: [
		{
			type: String,
		},
	],
})

export const userModel = model('user', userSchema)
