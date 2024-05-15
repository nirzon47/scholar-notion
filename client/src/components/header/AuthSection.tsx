'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'

import { verifyToken } from '@/lib/jwt'
import ProfileDropdown from './ProfileDropdown'
import { tokenAtom } from '@/lib/atoms'
import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

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
	const [decoded, setDecoded] = useState<any>(null)
	const [search, setSearch] = useState<string>('')

	// Take token from Jotai
	const token = useAtomValue(tokenAtom)

	// Handle form submission
	const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		router.push(`/courses/${search}`)

		setSearch('')
	}

	useEffect(() => {
		// Verify token
		let decodedToken = verifyToken(token as string)
		if (decodedToken instanceof Error) {
			decodedToken = null
		}

		setDecoded(decodedToken)
	}, [token])

	return (
		<div className='flex items-center gap-4 text-white'>
			{/* Login and sign up buttons */}
			{!decoded && (
				<div
					className={clsx(
						'hidden gap-2 md:flex',
						showSearch && 'md:hidden',
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
			)}

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
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
				</motion.div>
				<button
					className='absolute right-0 top-0 grid h-9 w-9 cursor-pointer place-content-center rounded-full border-border bg-black bg-opacity-20 duration-150 hover:bg-opacity-40'
					onClick={() => setShowSearch(!showSearch)}
					type='button'
				>
					<MagnifyingGlassIcon />
				</button>
			</form>

			{
				/* Profile dropdown */
				decoded !== null && (
					<>
						<Link
							href={'/cart'}
							className='grid h-9 w-9 cursor-pointer place-content-center rounded-full bg-black bg-opacity-20 duration-150 hover:bg-opacity-40'
						>
							<ShoppingCart className='h-4 w-4' />
						</Link>
						<ProfileDropdown user={decoded} />
					</>
				)
			}
		</div>
	)
}

export default AuthSection
