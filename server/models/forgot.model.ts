import { Schema, model } from 'mongoose'

const forgotPasswordSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	exp: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
})

export const forgotPasswordModel = model('forgotPassword', forgotPasswordSchema)
