export interface TabType {
	id: number
	title: string
	yap: string
	diff: string
	duration: string
}

export interface CourseType {
	_id: string
	name: string
	desc: string
	tags: string
	price: number
	thumbnail: string
	students: Array<string>
	instructor: InstructorType
}

interface InstructorType {
	_id: string
	name: string
	email: string
	contactNumber: string
	profile: any
}

export interface OrderType {
	_id: string
	courses: CourseType[]
	paymentId: string
	status: 'pending' | 'completed' | 'cancelled'
	total: number
	user: string
	created: Date
}
