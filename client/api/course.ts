import axios from 'axios'

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

export const courseAPI = { getSpecificCourse }
