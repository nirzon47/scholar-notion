import Image from 'next/image'
import GradientText from '../GradientText'

const AboutLanding = () => {
	return (
		<div className='relative grid min-h-[calc(100vh-3.5rem)] w-screen place-content-center px-2 py-12'>
			<Image
				src={'/blob.svg'}
				alt='blob'
				width={1000}
				height={250}
				quality={100}
				className='absolute top-0 -z-10 h-full w-full object-cover object-bottom'
			/>
			<div className='absolute inset-0 -z-10 bg-gradient-to-b from-black to-transparent'></div>
			<h1 className='mb-6 px-2 text-center text-2xl font-bold text-white md:text-4xl'>
				Driving Innovation in Online Education for a <br />
				<GradientText text={'Brighter Future'} />
			</h1>
			<p className='mx-auto mb-8 max-w-3xl px-2 text-center text-sm text-zinc-400 drop-shadow-xl md:text-lg'>
				ScholarNotion is at the forefront of driving innovation in online
				education. We are passionate about creating a brighter future by
				offering cutting-edge courses, leveraging emerging technologies, and
				nurturing a vibrant learning community.
			</p>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
				<Image
					src={'/about/about-1.webp'}
					alt='about-1'
					width={400}
					height={300}
					quality={100}
					className='duration-150 md:hover:scale-105'
				/>
				<Image
					src={'/about/about-2.webp'}
					alt='about-2'
					width={400}
					height={300}
					quality={100}
					className='duration-150 md:hover:scale-105'
				/>
				<Image
					src={'/about/about-3.webp'}
					alt='about-3'
					width={400}
					height={300}
					quality={100}
					className='duration-150 md:hover:scale-105'
				/>
			</div>
		</div>
	)
}

export default AboutLanding
