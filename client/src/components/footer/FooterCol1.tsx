import {
	GitHubLogoIcon,
	InstagramLogoIcon,
	LinkedInLogoIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'

const FooterCol1 = () => {
	return (
		<div className='flex flex-col gap-2'>
			<nav className='mt-4'>
				<h4 className='mb-2 font-semibold'>Company</h4>
				<ul className='mb-6 space-y-1 font-light text-zinc-400'>
					<li>
						<Link href='/about'>About</Link>
					</li>
					<li>
						<Link href={'/wip'}>Careers</Link>
					</li>
					<li>
						<Link href={'/wip'}>Affiliates</Link>
					</li>
				</ul>
				<div className='flex gap-4'>
					<a href='http://github.com/nirzon47'>
						<GitHubLogoIcon />
					</a>
					<a href='https://twitter.com/Nirzon47'>
						<TwitterLogoIcon />
					</a>
					<a href='http://www.linkedin.com/in/nirzon'>
						<LinkedInLogoIcon />
					</a>
					<InstagramLogoIcon />
				</div>
			</nav>
		</div>
	)
}

export default FooterCol1
