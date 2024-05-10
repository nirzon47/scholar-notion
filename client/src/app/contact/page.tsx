import GradientText from '@/components/GradientText'
import AboutContact from '@/components/about/AboutContact'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const Contact = () => {
	return (
		<div className='grid min-h-[calc(100vh-3.5rem)] place-content-center py-12'>
			<h1 className='mb-8 text-center text-2xl font-bold md:text-3xl'>
				We would love to <GradientText text={'hear from you'} />
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2'>
				<div className='px-2 pb-16'>
					<Card className='mx-auto max-w-lg'>
						<CardHeader>
							<CardTitle>Reach out to us</CardTitle>
							<CardDescription>All our contact details</CardDescription>
						</CardHeader>
						<CardContent className='grid grid-cols-1 gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='name'>Email</Label>
								<p id='name' className='p-0.5'>
									nirzon.dev@gmail.com
								</p>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='phone'>Phone Number</Label>
								<p id='phone' className='p-0.5'>
									+1 123-456-7890
								</p>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='address'>Address</Label>
								<p id='address' className='p-0.5'>
									123 Main St
								</p>
								<p id='address' className='p-0.5'>
									San Francisco
								</p>
								<p id='address' className='p-0.5'>
									California
								</p>
								<p id='address' className='p-0.5'>
									PIN: 12345
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
				<AboutContact />
			</div>
		</div>
	)
}

export default Contact
