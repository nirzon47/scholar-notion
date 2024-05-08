import Link from 'next/link'

const FooterCol3 = () => {
	return (
		<div className='flex flex-col gap-2'>
			<nav className='mt-4'>
				<h4 className='mb-2 font-semibold'>Plans</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					<li>
						<Link href={'/wip'}>Paid memberships</Link>
					</li>
					<li>
						<Link href={'/wip'}>For students</Link>
					</li>
					<li>
						<Link href={'/wip'}>Business solutions</Link>
					</li>
				</ul>
				<h4 className='mb-2 font-semibold'>Community</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					<li>
						<Link href={'/wip'}>Forums</Link>
					</li>
					<li>
						<Link href={'/wip'}>Chapters</Link>
					</li>
					<li>
						<Link href={'/wip'}>Events</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default FooterCol3
