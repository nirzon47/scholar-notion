'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

const CatalogDropdown = () => {
	const [open, setOpen] = useState<boolean>(false)

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
				<DropdownMenuItem>Web Development</DropdownMenuItem>
				<DropdownMenuItem>Android Development</DropdownMenuItem>
				<DropdownMenuItem>Artificial Intelligence</DropdownMenuItem>
				<DropdownMenuSeparator />
				<Link href={'/courses'}>
					<DropdownMenuItem>Explore All</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CatalogDropdown
