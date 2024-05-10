import { ContactUsSchema } from '@/lib/zod'
import axios from 'axios'
import { z } from 'zod'

export const contactUs = async (formBody: z.infer<typeof ContactUsSchema>) => {
	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`,
			formBody,
		)

		return data
	} catch (error) {
		return error
	}
}
