'use client'

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import NavigationLinks from './NavigationLinks'

const MobileNav = () => {
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setOpen(!open)
	}

	return (
		<div>
			<div onClick={handleOpen}>
				{!open ? (
					<HamburgerMenuIcon className='h-6 w-6' />
				) : (
					<Cross1Icon className='h-6 w-6' onClick={handleOpen} />
				)}
			</div>

			{open && (
				<motion.div
					className='fixed right-0 top-14 z-50 flex h-screen w-screen flex-col bg-white p-4 dark:bg-black'
					initial={{ x: -500 }}
					animate={{ x: 0 }}
					transition={{ duration: 0.1 }}
				>
					<NavigationLinks />
					<div className='flex flex-1 flex-col justify-end gap-4 pb-16'>
						<Link href='/auth/login' className='font-medium'>
							Login
						</Link>
						<Link href='/auth/signup' className='font-medium'>
							Sign Up
						</Link>
					</div>
				</motion.div>
			)}
		</div>
	)
}

export default MobileNav
