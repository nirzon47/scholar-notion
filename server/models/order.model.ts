import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	courses: {
		type: [Schema.Types.ObjectId],
		ref: 'course',
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	status: {
		type: String,
		default: 'pending',
		enum: ['pending', 'completed', 'cancelled'],
	},
	total: {
		type: Number,
		default: 0,
	},
	paymentId: String,
})

export const orderModel = model('order', orderSchema)
