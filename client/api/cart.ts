import axios from 'axios'
import Cookies from 'js-cookie'

const getCart = async () => {
	try {
		// Get token from cookies
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
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

export const cartAPI = { getCart }
