import axios from 'axios'
import Cookies from 'js-cookie'

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
			`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
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

// Logout
const logout = async () => {
	try {
		// Get token from cookies
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`,
			null,
			{
				headers: {
					Authorization,
				},
			},
		)

		Cookies.remove('scholarToken')

		return data
	} catch (error) {
		return error
	}
}

export const authAPI = { login, signup, logout }
