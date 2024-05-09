import Link from 'next/link'

const careerRelated = [
	'Career paths',
	'Career services',
	'Interview prep',
	'Professional certification',
	'Full Catalog',
	'Beta Content',
]

const FooterCol6 = () => {
	return (
		<div className='flex flex-col gap-2'>
			<nav className='mt-4'>
				<h4 className='mb-2 font-semibold'>Career Paths</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					{careerRelated.map((career) => (
						<li key={career}>
							<Link href={'/wip'}>{career}</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export default FooterCol6
