import axios from 'axios'
import Cookies from 'js-cookie'

const addCourse = async (formData: any) => {
	try {
		let fileURL

		if (formData.thumbnail) {
			if (formData.thumbnail.size > 5 * 1024 * 1024) {
				throw new Error('File too large')
			}
			if (
				formData.thumbnail.type !== 'image/jpeg' &&
				formData.thumbnail.type !== 'image/png' &&
				formData.thumbnail.type !== 'image/webp'
			) {
				throw new Error('Invalid file type')
			}

			const formBody = new FormData()
			formBody.append('image', formData.thumbnail)
			formBody.append('title', formData.name)
			formBody.append('description', formData.desc)
			formBody.append('type', 'file')

			const { data } = await axios.post(
				'https://api.imgur.com/3/image',
				formBody,
				{
					headers: {
						Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
					},
				},
			)

			fileURL = data.data.link
		}

		const token = Cookies.get('scholarToken')
		const Authorization = `Bearer ${token}`

		const body: any = {
			name: formData.name,
			desc: formData.desc,
			tags: formData.tags,
			price: formData.price,
		}

		if (fileURL) {
			body.thumbnail = fileURL
		}
		console.log(body)

		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/teacher/course`,
			body,
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

export const courseAPI = { addCourse }
