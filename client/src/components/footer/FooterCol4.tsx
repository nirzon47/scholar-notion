import Link from 'next/link'

const FooterCol4 = () => {
	return (
		<div className='flex flex-col gap-2'>
			<nav className='mt-4'>
				<h4 className='mb-2 font-semibold'>Subjects</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					<li>
						<Link href={'/wip'}>AI</Link>
					</li>
					<li>
						<Link href={'/wip'}>Cloud Computing</Link>
					</li>
					<li>
						<Link href={'/wip'}>Code Foundations</Link>
					</li>
					<li>
						<Link href={'/wip'}>Computer Science</Link>
					</li>
					<li>
						<Link href={'/wip'}>Cybersecurity</Link>
					</li>
					<li>
						<Link href={'/wip'}>Data Analytics</Link>
					</li>
					<li>
						<Link href={'/wip'}>Data Science</Link>
					</li>
					<li>
						<Link href={'/wip'}>Data Visualization</Link>
					</li>
					<li>
						<Link href={'/wip'}>Developer Tools</Link>
					</li>
					<li>
						<Link href={'/wip'}>DevOps</Link>
					</li>
					<li>
						<Link href={'/wip'}>Game Development</Link>
					</li>
					<li>
						<Link href={'/wip'}>IT</Link>
					</li>
					<li>
						<Link href={'/wip'}>Machine Learning</Link>
					</li>
					<li>
						<Link href={'/wip'}>Math</Link>
					</li>
					<li>
						<Link href={'/wip'}>Mobile Development</Link>
					</li>
					<li>
						<Link href={'/wip'}>Web Design</Link>
					</li>
					<li>
						<Link href={'/wip'}>Web Development</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default FooterCol4
