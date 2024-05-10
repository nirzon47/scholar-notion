'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ContactUsSchema } from '@/lib/zod'
import { useToast } from '../ui/use-toast'
import { contactUs } from '../../../api/contact'

const AboutContact = () => {
	const { toast } = useToast()
	// Form states
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [sending, setSending] = useState<boolean>(false)

	// Handle form submission
	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setSending(true)
			const formData = { name, email, message }

			// Validate form
			const result = ContactUsSchema.safeParse(formData)
			if (!result.success) {
				toast({
					title: 'Validation error',
					description: result.error.issues[0].message,
					variant: 'destructive',
				})
			}

			// Submit form
			const response = await contactUs(formData)

			// Handle success
			if (response.ok) {
				toast({
					title: 'Message sent',
					description: 'Your message has been sent successfully.',
				})
			} else {
				toast({
					title: 'Error',
					description: response.error,
					variant: 'destructive',
				})
			}

			setName('')
			setEmail('')
			setMessage('')
		} finally {
			setSending(false)
		}
	}

	return (
		<div className='w-screen place-content-center px-2 pb-16'>
			<Card className='mx-auto max-w-lg'>
				<CardHeader>
					<CardTitle>Contact Us</CardTitle>
					<CardDescription>Get in touch with us</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='grid grid-cols-1 gap-6'
						onSubmit={handleFormSubmit}
					>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='message'>Message</Label>
							<Textarea
								id='message'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>
						<Button type='submit'>
							{sending ? 'Sending...' : 'Send'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default AboutContact
