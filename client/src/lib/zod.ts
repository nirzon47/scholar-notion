import { z } from 'zod'

// Zod schemas
export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export const SignupSchema = z
	.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
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
