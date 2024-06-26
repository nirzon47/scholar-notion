import TeacherNav from '@/components/teacher/TeacherNav'

const paths = ['Your courses', 'Add Course']

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex min-h-[calc(100vh-3.5rem)] w-full flex-col'>
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Manage Courses</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav
						className='grid gap-4 text-sm text-muted-foreground'
						x-chunk='dashboard-04-chunk-0'
					>
						{paths.map((path) => (
							<TeacherNav key={path} path={path} />
						))}
					</nav>
					<div className='grid gap-6'>{children}</div>
				</div>
			</main>
		</div>
	)
}

export default TeacherLayout
