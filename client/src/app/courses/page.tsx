import AllCourses from '@/components/courses/AllCourses'

const Courses = () => {
	return (
		<div className='flex min-h-[calc(100vh-3.5rem)] w-full flex-col'>
			<div className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='mb-8 text-3xl font-semibold'>All Courses</h1>
					<AllCourses />
				</div>
			</div>
		</div>
	)
}

export default Courses
