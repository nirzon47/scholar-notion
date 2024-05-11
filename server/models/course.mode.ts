import { Schema, model } from 'mongoose'

const courseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	instructor: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	tags: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	students: {
		type: [Schema.Types.ObjectId],
		ref: 'user',
	},
	content: {
		type: Schema.Types.ObjectId,
		ref: 'courseContent',
	},
	thumbnail: {
		type: String,
	},
	reviews: {
		type: [Schema.Types.ObjectId],
		ref: 'review',
	},
})

export const courseModel = model('course', courseSchema)
