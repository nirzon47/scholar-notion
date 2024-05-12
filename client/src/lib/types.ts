export interface TabType {
	id: number
	title: string
	yap: string
	diff: string
	duration: string
}

export interface CourseType {
	_id: number
	name: string
	desc: string
	tags: string
	price: number
	thumbnail: string
	students: Array<string>
}
