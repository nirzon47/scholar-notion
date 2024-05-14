import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	orders: [
		{
			courses: {
				type: [Schema.Types.ObjectId],
				ref: 'course',
			},
			created: {
				type: Date,
				default: Date.now,
			},
			status: {
				type: String,
				default: 'pending',
				enum: ['pending', 'completed', 'cancelled'],
			},
			paymentId: String,
		},
	],
})

export const orderModel = model('order', orderSchema)
