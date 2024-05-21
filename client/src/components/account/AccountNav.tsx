'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AccountNav = ({ path }: { path: string }) => {
	const pathName = usePathname().split('/').pop()?.split(' ').join('-')
	const newPath = path.split(' ').join('-')

	return (
		<Link
			href={`/account/${newPath.toLowerCase()}`}
			className={clsx(
				pathName === newPath.toLowerCase() && 'font-semibold text-primary',
			)}
		>
			{path}
		</Link>
	)
}

export default AccountNav
