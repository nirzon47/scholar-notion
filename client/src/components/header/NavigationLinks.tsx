'use client'

import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mobileNavOpen } from './MobileNav'

const navItems = [
	{ name: 'Home', path: '' },
	{ name: 'Catalog', path: 'catalog' },
	{ name: 'About', path: 'about' },
	{ name: 'Contact', path: 'contact' },
]

const NavigationLinks = () => {
	const path = usePathname().split('/')
	const setOpen = useSetAtom(mobileNavOpen)

	return (
		<nav>
			<ul className='flex flex-col gap-4 md:flex-row md:gap-6'>
				{navItems.map((item) => {
					if (item.name !== 'Catalog') {
						return (
							<li
								key={item.name}
								className={
									path[1] === item.path
										? 'font-medium text-primary'
										: 'text-white'
								}
							>
								<Link
									href={`/${item.path}`}
									className='duration-150 hover:text-primary'
									onClick={() => setOpen(false)}
								>
									{item.name}
								</Link>
							</li>
						)
					} else {
						return (
							<li
								key={item.name}
								className={
									path[1] === item.path
										? 'font-medium text-primary'
										: 'text-white'
								}
							>
								<div className='group flex cursor-pointer items-center gap-1'>
									<p className='duration-150 group-hover:text-primary'>
										{item.name}
									</p>
									<TriangleDownIcon className='duration-150 group-hover:-rotate-90 group-hover:text-primary' />
								</div>
							</li>
						)
					}
				})}
			</ul>
		</nav>
	)
}

export default NavigationLinks
