import { CourseType } from '@/lib/types'
import Image from 'next/image'

const CourseArray = ({ courses }: { courses: CourseType[] }) => {
	const length = courses.length
	const mapLength = length > 3 ? 3 : length

	return (
		<div className='flex flex-wrap items-center gap-2'>
			{Array.from({ length: mapLength }).map((_, index) => (
				<Image
					key={courses[index]._id}
					src={courses[index].thumbnail || '/placeholder.svg'}
					alt={courses[index].name}
					width={300}
					height={300}
					quality={100}
					className='aspect-square h-14 w-14 rounded-md object-cover object-center lg:h-28 lg:w-28'
				/>
			))}

			{length > 3 && (
				<div className='flex h-14 w-14 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-600 lg:h-28 lg:w-28'>
					+ {length - 3}
				</div>
			)}
		</div>
	)
}

export default CourseArray
