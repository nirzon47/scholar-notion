import GradientText from '@/components/GradientText'
import TaggedCourses from '@/components/courses/TaggedCourses'

const WebDevCourses = () => {
	return (
		<div>
			<header className='mb-8 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent py-24'>
				<h1 className='mx-auto max-w-6xl text-4xl font-bold text-white'>
					<GradientText text='Web Development Courses' />
				</h1>
			</header>
			<main className='mx-auto max-w-6xl'>
				<TaggedCourses tag='web development' />
			</main>
		</div>
	)
}

export default WebDevCourses
