import { Schema, model } from 'mongoose'

const profileSchema = new Schema({
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
	},
	dob: {
		type: Date,
	},
	about: {
		type: String,
	},
	contactNumber: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
})

export const profileModel = model('profile', profileSchema)
