import { z } from 'zod'

// Zod schemas
export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const SignupSchema = z
	.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
		role: z.enum(['admin', 'teacher', 'student']),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
			})
		}
	})

export const ContactUsSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	message: z.string(),
})
