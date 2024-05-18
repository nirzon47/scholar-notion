import Razorpay = require('razorpay')

export interface razorpayOrderType {
	id: string
}

const rpInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID!,
	key_secret: process.env.RAZORPAY_SECRET!,
})

export const razorpayPayment = async (total: number) => {
	const razorPayOptions = {
		amount: total! * 100,
		currency: 'INR',
		payment_capture: 1,
	}

	try {
		return await rpInstance.orders.create(razorPayOptions)
	} catch (error) {
		return error
	}
}
