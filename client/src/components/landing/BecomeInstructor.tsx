import Image from 'next/image'
import GradientText from '../GradientText'
import { Button } from '../ui/button'
import Link from 'next/link'

const BecomeInstructor = () => {
	return (
		<section className='relative h-[calc(100vh-3.5rem)] w-screen'>
			<Image
				src={'/waves-2.svg'}
				alt='waves'
				width={1000}
				height={250}
				quality={100}
				className='absolute top-0 -z-10 h-full w-full object-cover object-top'
			/>

			<div className='absolute inset-0 mx-auto flex max-w-4xl items-center justify-between gap-12'>
				<Image
					src={'/instructor.webp'}
					alt='Instructor'
					width={500}
					height={500}
					className='hidden h-3/5 w-auto shadow-[7px_7px_0px_0px_#22d3ee] md:inline-block'
				/>
				<div className='flex flex-col items-end justify-end p-4 text-right'>
					<h3 className='text-3xl font-bold'>
						Become an <GradientText text={'Instructor'} />
					</h3>
					<p className='my-4 w-72 text-zinc-400'>
						Instructors from around the world teach millions of students
						on ScholarNotion. We provide the tools and skills to teach
						what you love.
					</p>
					<Button>
						<Link href={'/auth/signup'}>Join us</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default BecomeInstructor
