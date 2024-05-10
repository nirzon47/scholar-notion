import axios from 'axios'
import Cookies from 'js-cookie'

const getProfile = async () => {
	try {
		// Get token from cookies
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/user`,
			{
				headers: {
					Authorization,
				},
			},
		)

		if (data.profile === null) return null

		return data.user.profile
	} catch (error) {
		return error
	}
}

const updateProfile = async ({ changes }: { changes: any }) => {
	try {
		// Get token from cookies
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.put(
			`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
			{
				...changes,
			},
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

export const profileAPI = { getProfile, updateProfile }
