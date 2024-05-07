'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { z } from 'zod'
import { authAPI } from '../../../../api/auth'
import { LoginSchema } from '@/lib/zod'
import EmailInput from '@/components/auth-inputs/EmailInput'
import PasswordInput from '@/components/auth-inputs/PasswordInput'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { scholarToken } from '@/components/header/Header'

const Login = () => {
	const { toast } = useToast()
	const router = useRouter()

	// Form state
	const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
		email: '',
		password: '',
	})
	// Token state
	const setToken = useSetAtom(scholarToken)

	// Handle form submission
	const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validate form
		const result = LoginSchema.safeParse(formData)
		if (!result.success) {
			toast({
				title: 'Validation error',
				description: result.error.issues[0].message,
				variant: 'destructive',
			})

			return
		}

		// Submit form
		const response = await authAPI.login(formData.email, formData.password)

		// Handle success
		if (response.ok) {
			toast({
				title: 'Login successful',
				description: 'You have successfully logged in. Redirecting...',
				duration: 3000,
			})

			// Resets form and redirects to home after 3 seconds
			setFormData({ email: '', password: '' })

			setTimeout(() => {
				router.push('/')
			}, 3_000)

			setToken(response.token)
			return
		}

		// Handle error
		toast({
			title: 'Login failed',
			description: 'Please check your credentials and try again.',
			variant: 'destructive',
		})
	}

	return (
		<form
			className='grid flex-1 place-content-center px-2'
			onSubmit={handleFormSubmission}
		>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email and password below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='grid gap-2'>
						<EmailInput formData={formData} setFormData={setFormData} />
					</div>
					<div className='grid gap-2'>
						<PasswordInput
							formData={formData}
							setFormData={setFormData}
						/>
					</div>
				</CardContent>
				<CardFooter className='grid gap-2'>
					<Button type='submit' className='w-full'>
						Sign in
					</Button>
					<p className='text-sm'>
						New here?{' '}
						<Link
							href='/auth/signup'
							className='text-primary hover:underline'
						>
							Sign up!
						</Link>
					</p>
				</CardFooter>
			</Card>
		</form>
	)
}

export default Login
