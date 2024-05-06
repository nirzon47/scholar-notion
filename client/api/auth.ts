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

// Signup API
const signup = async (
	name: string,
	email: string,
	password: string,
	role: string,
) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`,
			{
				name,
				email,
				password,
				role,
			},
		)

		return data
	} catch (error) {
		return error
	}
}

export const authAPI = { login, signup }
