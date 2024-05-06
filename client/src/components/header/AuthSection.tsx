'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

// Framer motion variants for search bar
const variants = {
	open: {
		x: 0,
		opacity: 1,
	},
	closed: {
		x: 1000,
		opacity: 0,
	},
}

const AuthSection = ({
	showSearch,
	setShowSearch,
}: {
	showSearch: boolean
	setShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const router = useRouter()

	// Handle form submission
	const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setShowSearch(!showSearch)
	}

	return (
		<div className='flex items-center gap-4 text-white'>
			{/* Login and sign up buttons */}
			<div
				className={clsx(
					'hidden gap-2 md:flex',
					showSearch ? 'hidden md:hidden' : 'flex',
				)}
			>
				<Button
					variant={'outline'}
					className='border border-white/5 bg-transparent hover:bg-yellow-300/10'
					onClick={() => router.push('/auth/login')}
				>
					Login
				</Button>
				<Button
					variant={'outline'}
					className='border border-white/5 bg-transparent hover:bg-yellow-300/10'
					onClick={() => router.push('/auth/signup')}
				>
					Sign Up
				</Button>
			</div>
			{/* Search bar */}
			<form className='relative h-8 min-w-8' onSubmit={handleFormSubmission}>
				<motion.div
					variants={variants}
					animate={showSearch ? 'open' : 'closed'}
					className={clsx(
						'h-9 rounded-full',
						showSearch ? 'block' : 'hidden',
					)}
				>
					<input
						type='text'
						name='search'
						id='search'
						placeholder='Search'
						className='h-full w-48 rounded-full border bg-black bg-opacity-20 pl-4 pr-10 placeholder:text-zinc-300 focus:outline-none md:w-80'
					/>
				</motion.div>
				<button
					type='submit'
					className='absolute right-0 top-0 grid h-9 w-9 cursor-pointer place-content-center rounded-full border bg-black bg-opacity-20 duration-150 hover:bg-opacity-40'
				>
					<MagnifyingGlassIcon />
				</button>
			</form>
		</div>
	)
}

export default AuthSection
