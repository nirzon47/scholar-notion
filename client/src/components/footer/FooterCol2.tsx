import Link from 'next/link'

const FooterCol2 = () => {
	return (
		<div className='flex flex-col gap-2'>
			<nav className='mt-4'>
				<h4 className='mb-2 font-semibold'>Resources</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					<li>
						<Link href={'/wip'}>Articles</Link>
					</li>
					<li>
						<Link href={'/wip'}>Blog</Link>
					</li>
					<li>
						<Link href={'/wip'}>Chart Sheet</Link>
					</li>
					<li>
						<Link href={'/wip'}>Code challenges</Link>
					</li>
					<li>
						<Link href={'/wip'}>Docs</Link>
					</li>
					<li>
						<Link href={'/wip'}>Projects</Link>
					</li>
					<li>
						<Link href={'/wip'}>Videos</Link>
					</li>
					<li>
						<Link href={'/wip'}>Workspaces</Link>
					</li>
				</ul>

				<h4 className='mb-2 font-semibold'>Support</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					<li>
						<Link href={'/wip'}>Help center</Link>
					</li>
					<li>
						<Link href={'/wip'}>Contact us</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default FooterCol2
