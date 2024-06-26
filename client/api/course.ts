import axios from 'axios'
import Cookies from 'js-cookie'

// Get course by ID
const getSpecificCourse = async (id: string) => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/course/${id}`,
		)

		return data
	} catch (error) {
		return error
	}
}

// Get all courses
const getAllCourses = async () => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/course`,
		)

		return data
	} catch (error) {
		return error
	}
}

// Get course by tags
const getCourseByTag = async (tag: string) => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/course/tag/${tag}`,
		)

		return data
	} catch (error) {
		return error
	}
}

// Get purchased courses
const getPurchasedCourses = async () => {
	try {
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/course/purchased`,
			{
				headers: {
					Authorization,
				},
			},
		)

		return data
	} catch (error) {
		return error
	}
}

export const courseAPI = {
	getSpecificCourse,
	getAllCourses,
	getCourseByTag,
	getPurchasedCourses,
}
