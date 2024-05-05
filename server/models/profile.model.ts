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
})

export const profileModel = model('profile', profileSchema)
