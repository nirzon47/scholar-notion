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
import { SignupSchema } from '@/lib/zod'
import EmailInput from '@/components/auth-inputs/EmailInput'
import PasswordInput from '@/components/auth-inputs/PasswordInput'
import { useRouter } from 'next/navigation'
import NameInput from '@/components/auth-inputs/NameInput'
import ConfirmPasswordInput from '@/components/auth-inputs/ConfirmPasswordInput'
import RoleSelect from '@/components/auth-inputs/RoleSelect'
import Link from 'next/link'

const Signup = () => {
	const { toast } = useToast()
	const router = useRouter()

	// Form state
	const [formData, setFormData] = useState<z.infer<typeof SignupSchema>>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: 'student',
	})

	// Handle form submission
	const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validate form
		const result = SignupSchema.safeParse(formData)
		if (!result.success) {
			toast({
				title: 'Validation error',
				description: result.error.issues[0].message,
				variant: 'destructive',
			})

			return
		}

		// Submit form
		const response = await authAPI.signup(
			formData.name,
			formData.email,
			formData.password,
			formData.role,
		)

		// Handle success
		if (response.ok) {
			toast({
				title: 'Registration successful',
				description:
					'You have successfully signed up. Redirecting to login page...',
				duration: 3000,
			})

			// Resets form and redirects to home after 3 seconds
			setFormData({
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
				role: 'student',
			})

			setTimeout(() => {
				router.push('/auth/login')
			}, 3_000)

			return
		}

		// Handle error
		toast({
			title: 'Registration failed',
			description: 'Please check your details and try again.',
			variant: 'destructive',
		})
	}

	return (
		<form
			className='grid flex-1 place-content-center p-2'
			onSubmit={handleFormSubmission}
		>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Sign Up</CardTitle>
					<CardDescription>
						Please enter your details. All fields are required.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='grid gap-2'>
						<NameInput formData={formData} setFormData={setFormData} />
					</div>
					<div className='grid gap-2'>
						<EmailInput formData={formData} setFormData={setFormData} />
					</div>
					<div className='flex gap-2'>
						<div className='grid gap-2'>
							<PasswordInput
								formData={formData}
								setFormData={setFormData}
							/>
						</div>
						<div className='grid gap-2'>
							<ConfirmPasswordInput
								formData={formData}
								setFormData={setFormData}
							/>
						</div>
					</div>
					<div className='grid gap-2'>
						<RoleSelect formData={formData} setFormData={setFormData} />
					</div>
				</CardContent>
				<CardFooter className='grid gap-2'>
					<Button type='submit' className='w-full'>
						Sign up
					</Button>
					<p className='text-sm'>
						Already have an account?{' '}
						<Link
							href='/auth/signup'
							className='text-primary hover:underline'
						>
							Login!
						</Link>
					</p>
				</CardFooter>
			</Card>
		</form>
	)
}

export default Signup
