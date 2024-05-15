import GradientText from '@/components/GradientText'
import TaggedCourses from '@/components/courses/TaggedCourses'

const AIMLCourses = () => {
	return (
		<div>
			<header className='mb-8 bg-gradient-to-b from-slate-300 to-transparent p-4 py-24 dark:from-slate-900'>
				<h1 className='mx-auto max-w-6xl text-4xl font-bold text-white'>
					<GradientText text='AI/ML Courses' />
				</h1>
			</header>
			<div className='mx-auto mb-12 max-w-6xl p-4'>
				<TaggedCourses tag='artificial intelligence' />
			</div>
		</div>
	)
}

export default AIMLCourses
