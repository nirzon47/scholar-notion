import axios from 'axios'
import Cookies from 'js-cookie'

// Buy now
const buyNow = async (id: string) => {
	try {
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`,
			null,
			{
				headers: { Authorization },
			},
		)

		return data
	} catch (error) {
		return error
	}
}

// Buy cart
const buyCart = async () => {
	try {
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/order/buy-cart`,
			null,
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

// Verify payment
const verifyPayment = async (id: string, paymentId: string) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/order/verify`,
			{ id, paymentId },
		)

		console.log(data)

		return data
	} catch (error) {
		return error
	}
}

// Get orders
const getOrders = async () => {
	try {
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/order`,
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

// Get a specific
const getSpecificOrder = async (id: string) => {
	try {
		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`,
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

export const orderAPI = {
	buyNow,
	buyCart,
	verifyPayment,
	getOrders,
	getSpecificOrder,
}
