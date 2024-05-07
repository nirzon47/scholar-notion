'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'
import { scholarToken } from '@/app/auth/login/page'
import { verifyToken } from '@/lib/jwt'
import ProfileDropdown from './ProfileDropdown'

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

	// Take token from Jotai
	const token = useAtomValue(scholarToken)
	// Verify token
	let decoded = verifyToken(token)
	if (decoded instanceof Error) {
		decoded = null
	}

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
					'hidden gap-2',
					token === null ? 'md:flex' : 'md:hidden',
					showSearch ? 'hidden md:hidden' : 'flex',
				)}
			>
				<Button
					variant={'outline'}
					className='border border-white/5 bg-transparent hover:bg-yellow-300/10 hover:text-white'
					onClick={() => router.push('/auth/login')}
				>
					Login
				</Button>
				<Button
					variant={'outline'}
					className='border border-white/5 bg-transparent hover:bg-yellow-300/10 hover:text-white'
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
					className='absolute right-0 top-0 grid h-9 w-9 cursor-pointer place-content-center rounded-full border-border bg-black bg-opacity-20 duration-150 hover:bg-opacity-40 '
				>
					<MagnifyingGlassIcon />
				</button>
			</form>

			{
				/* Profile dropdown */
				decoded !== null && <ProfileDropdown user={decoded} />
			}
		</div>
	)
}

export default AuthSection
