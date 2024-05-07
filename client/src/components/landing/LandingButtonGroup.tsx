'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const LandingButtonGroup = () => {
	const router = useRouter()

	return (
		<div className='my-6 flex items-center justify-center gap-4'>
			<Button onClick={() => router.push('/about')}>Learn More</Button>
			<Button
				variant={'outline'}
				onClick={() => router.push('/auth/signup')}
			>
				Join Now
			</Button>
		</div>
	)
}

export default LandingButtonGroup
