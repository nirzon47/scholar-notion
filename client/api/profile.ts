import axios from 'axios'

const getProfile = async () => {
	try {
		const token = localStorage.getItem('scholarToken')
		const Authorization = `Bearer ${token?.substring(1, token.length - 1)}` // Remove quotes

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
		const token = localStorage.getItem('scholarToken')
		const Authorization = `Bearer ${token?.substring(1, token.length - 1)}` // Remove quotes

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
