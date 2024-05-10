import Image from 'next/image'
import GradientText from '../GradientText'

const AboutFounding = () => {
	return (
		<div className='mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl grid-cols-1 place-content-center gap-4 py-12 md:grid-cols-2'>
			<div className='px-2'>
				<h2 className='mb-6 text-xl font-bold md:text-3xl'>
					<GradientText text={'Our Founding Story'} />
				</h2>
				<div className='flex max-w-lg flex-col gap-4 text-sm text-zinc-800 dark:text-zinc-300 md:text-base'>
					<p>
						Our e-learning platform was born out of a shared vision and
						passion for transforming education. It all began with a group
						of educators, technologists, and lifelong learners who
						recognized the need for accessible, flexible, and high-quality
						learning opportunities in a rapidly evolving digital world.
					</p>
					<p>
						As experienced educators ourselves, we witnessed firsthand the
						limitations and challenges of traditional education systems.
						We believed that education should not be confined to the walls
						of a classroom or restricted by geographical boundaries. We
						envisioned a platform that could bridge these gaps and empower
						individuals from all walks of life to unlock their full
						potential.
					</p>
				</div>
			</div>
			<div className='px-2'>
				<Image
					src={'/about/founding.jpg'}
					alt='founding'
					width={500}
					height={500}
					className='object-cover'
					quality={100}
				/>
			</div>
		</div>
	)
}

export default AboutFounding
