import Image from 'next/image'
import Link from 'next/link'

const Forbidden = () => {
	return (
		<div className='grid h-[calc(100vh-3.5rem)] place-content-center'>
			<Image
				src={'/forbidden.svg'}
				alt='wip'
				width={256}
				height={256}
				quality={100}
				className='mx-auto mb-8'
			/>
			<h1 className='mb-4 text-center text-2xl font-bold'>
				Uh Oh! Looks like you don&apos;t have access to this page.
			</h1>
			<p className='text-center text-sm font-light tracking-wider text-zinc-400'>
				Make sure you are logged in
			</p>
			<p className='inline-block text-center text-sm font-light tracking-wider text-primary underline'>
				<Link href={'/'} className='duration-150 hover:text-yellow-100'>
					Go to home
				</Link>
			</p>
		</div>
	)
}

export default Forbidden
