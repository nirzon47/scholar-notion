import { z } from 'zod'

// Zod schemas
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
