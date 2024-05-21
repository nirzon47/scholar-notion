'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { forgotPassword } from '../../../../api/forgot'
import { useToast } from '@/components/ui/use-toast'
import clsx from 'clsx'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>()
	const [emailSent, setEmailSent] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [inputOTP, setInputOTP] = useState('')
	const [password, setPassword] = useState('')

	const { toast } = useToast()
	const router = useRouter()

	const handleEmailSubmission = async () => {
		setLoading(true)
		const response = await forgotPassword.sendEmail(email!)

		if (response.ok) {
			setEmailSent(true)
		} else {
			toast({
				title: 'Error',
				description:
					response.message || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}

	const resetPassword = async () => {
		setLoading(true)
		const response = await forgotPassword.resetPassword(password, inputOTP)

		if (response.ok) {
			toast({
				title: 'Success',
				description: 'Password reset successful. Redirecting...',
				duration: 3000,
			})

			setTimeout(() => {
				router.push('/auth/login')
			}, 2000)
		} else {
			toast({
				title: 'Error',
				description:
					response.message || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}
	}

	return (
		<form
			className='grid flex-1 place-content-center p-2'
			onSubmit={(e) => e.preventDefault()}
		>
			<Card className='w-full max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email and password below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					{loading && <Loading />}
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							placeholder='Email'
							type='email'
							className='mb-4'
							onChange={(e: any) => setEmail(e.target.value)}
							value={email}
						/>
						{emailSent && (
							<div className='grid items-center justify-center'>
								<Label htmlFor='otp' className='mb-2 text-center'>
									OTP
								</Label>
								<InputOTP
									id='otp'
									maxLength={6}
									className=''
									value={inputOTP}
									onChange={setInputOTP}
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
								<Label htmlFor='password' className='mb-2 mt-4'>
									Password
								</Label>
								<Input
									id='password'
									type='password'
									placeholder='Password'
									className='mb-4'
									value={password}
									onChange={(e: any) => setPassword(e.target.value)}
								/>
								<Button className='mt-4 w-full' onClick={resetPassword}>
									Submit
								</Button>
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter className='grid gap-2'>
					<Button
						type='submit'
						className={clsx('w-full', emailSent && 'hidden')}
						onClick={handleEmailSubmission}
					>
						Sign in
					</Button>
					<div className='flex justify-between'>
						<p className='text-sm'>
							<Link
								href='/auth/login'
								className='text-primary hover:underline'
							>
								Go back to login?
							</Link>
						</p>
						<p className='text-sm'>
							<Link
								href='/auth/signup'
								className='text-primary hover:underline'
							>
								Sign Up!
							</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</form>
	)
}

export default ForgotPassword
