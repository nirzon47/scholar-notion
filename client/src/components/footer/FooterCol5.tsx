import Link from 'next/link'

const languages = [
	'Bash',
	'C++',
	'C#',
	'Go',
	'HTML & CSS',
	'Java',
	'JavaScript',
	'Kotlin',
	'PHP',
	'Python',
	'R',
	'Ruby',
	'SQL',
	'Swift',
]

const FooterCol5 = () => {
	return (
		<div className='flex flex-col gap-2'>
			<nav className='mt-4'>
				<h4 className='mb-2 font-semibold'>Languages</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					{languages.map((language) => (
						<li key={language}>
							<Link href={'/wip'}>{language}</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export default FooterCol5
