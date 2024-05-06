import axios from 'axios'

// Login API
const login = async (email: string, password: string) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
			{
				email,
				password,
			},
		)

		return data
	} catch (error) {
		return error
	}
}

export const authAPI = { login }
