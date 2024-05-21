import axios from 'axios'

// Send email
const sendEmail = async (email: string) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/forgot/sendToken`,
			{ email },
		)

		return data
	} catch (error) {
		return error
	}
}

// Reset password
const resetPassword = async (password: string, inputOTP: string) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/forgot/resetPassword`,
			{ password, token: inputOTP },
		)

		return data
	} catch (error) {
		return error
	}
}

export const forgotPassword = { sendEmail, resetPassword }
