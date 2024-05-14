import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	courses: {
		type: [Schema.Types.ObjectId],
		ref: 'course',
	},
})

export const cartModel = model('cart', cartSchema)
