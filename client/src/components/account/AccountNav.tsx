'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AccountNav = ({ path }: { path: string }) => {
	const pathName = usePathname().split('/').pop()

	return (
		<Link
			href={`/account/${path.toLowerCase()}`}
			className={clsx(
				pathName === path.toLowerCase() && 'font-semibold text-primary',
			)}
		>
			{path}
		</Link>
	)
}

export default AccountNav
