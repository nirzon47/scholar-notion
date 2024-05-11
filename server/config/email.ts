import * as nodemailer from 'nodemailer'

export const sendEmail = async (
	email: string,
	subject: string,
	text: string
) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.GMAIL,
				pass: process.env.GMAIL_PASSWORD,
			},
		})

		await transporter.sendMail({
			from: `ScholarNotion <${process.env.GMAIL}>`,
			to: email,
			subject: subject,
			html: `<h1 style="font-size: 24px; font-weight: medium;">Hello from ScholarNotion! We heard you forgot your password.</h1><p style="font-size: 18px;">Your verification code is: <b>${text}</b></p> <p style="font-size: 12px; color: #a0a0a0; font-weight: medium;">If you did not request this, please ignore this email.</p>`,
		})
	} catch (error) {
		console.log(error)
	}
}
