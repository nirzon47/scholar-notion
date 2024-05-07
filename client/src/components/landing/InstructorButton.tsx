'use client'

import { CaretRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const InstructorButton = () => {
	const router = useRouter()

	return (
		<button
			className='mx-auto flex items-center justify-center gap-2 rounded-full bg-zinc-800 px-6 py-2 text-sm font-semibold text-white ring-1 duration-150 hover:-translate-y-0.5 hover:scale-[1.0125] hover:bg-opacity-30 hover:font-bold md:text-base'
			onClick={() => router.push('/auth/signup')}
		>
			Become an Instructor <CaretRightIcon />
		</button>
	)
}

export default InstructorButton
