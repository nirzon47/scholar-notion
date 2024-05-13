'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { mobileNavOpenAtom } from '@/lib/atoms'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { useState } from 'react'

const CatalogDropdown = () => {
	const [open, setOpen] = useState<boolean>(false)
	const setMobileNavOpen = useSetAtom(mobileNavOpenAtom)

	return (
		<DropdownMenu onOpenChange={setOpen}>
			<DropdownMenuTrigger>
				<li>
					<span className='group flex cursor-pointer items-center gap-1'>
						<span className='block duration-150 group-hover:text-primary'>
							Catalog
						</span>
						<TriangleDownIcon
							className={clsx(
								'duration-150 group-hover:text-primary',
								open && '-rotate-90',
							)}
						/>
					</span>
				</li>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-[180px] rounded-xl p-2'>
				<DropdownMenuLabel>Explore Our Catalog</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link
					href={'/courses/web-dev'}
					onClick={() => setMobileNavOpen(false)}
				>
					<DropdownMenuItem>Web Development</DropdownMenuItem>
				</Link>
				<Link
					href={'/courses/android'}
					onClick={() => setMobileNavOpen(false)}
				>
					<DropdownMenuItem>Android Development</DropdownMenuItem>
				</Link>
				<Link
					href={'/courses/ai-ml'}
					onClick={() => setMobileNavOpen(false)}
				>
					<DropdownMenuItem>Artificial Intelligence</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<Link href={'/courses'} onClick={() => setMobileNavOpen(false)}>
					<DropdownMenuItem>Explore All</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CatalogDropdown
