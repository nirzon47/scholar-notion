import GradientText from '@/components/GradientText'
import CSSSection from '@/components/landing/CSSSection'
import HTMLSection from '@/components/landing/HTMLSection'
import InstructorButton from '@/components/landing/InstructorButton'
import JSSection from '@/components/landing/JSSection'
import LandingButtonGroup from '@/components/landing/LandingButtonGroup'
import LandingPaths from '@/components/landing/LandingPaths'

const Home = () => {
	// Random image
	const random = Math.floor(Math.random() * 5) + 1

	return (
		<div>
			<main
				style={{
					backgroundImage: `url('/landing/landing-${random}.webp')`,
				}}
				className={`relative grid h-[calc(100vh-3.5rem)] w-full place-content-center bg-center object-cover`}
			>
				<div className='absolute inset-0 bg-black opacity-85'></div>
				<div className='z-10 mx-auto max-w-7xl px-2'>
					<InstructorButton />
					<h1 className='my-12 text-center text-2xl font-bold text-white md:text-4xl'>
						Empower your Future with{' '}
						<GradientText text={'Coding Skills'} />
					</h1>
					<p className='max-w-4xl text-center text-sm text-zinc-400 drop-shadow-xl md:text-lg'>
						With our online coding courses, you can learn at your own
						pace, from anywhere in the world, and get access to a wealth
						of resources, including hands-on projects, quizzes, and
						personalized feedback from instructors.
					</p>
					<LandingButtonGroup />
				</div>
			</main>
			<HTMLSection />
			<CSSSection />
			<JSSection />
			<LandingPaths />
		</div>
	)
}

export default Home
