import { CourseType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Hash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'

const CourseItem = ({ course }: { course: CourseType }) => {
	return (
		<Card>
			<Image
				src={course.thumbnail || '/placeholder.svg'}
				alt={course.name}
				width={600}
				height={600}
				quality={75}
				className='h-32 w-full rounded-tl-xl rounded-tr-xl object-cover object-center'
			/>
			<CardHeader>
				<CardTitle>{course.name}</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<p className='h-24 text-sm text-zinc-900 dark:text-zinc-300'>
					{course.desc}
				</p>
				<p className='flex h-14 items-center gap-2 text-sm font-light text-zinc-800 dark:text-zinc-400'>
					<Hash /> Tags: {course.tags.split(',').join(', ')}
				</p>
				<div className='flex items-center justify-between'>
					<p className='font-bold'>Price: ₹{course.price}</p>
					<p className='font-bold'>Enrolled: {course.students.length}</p>
				</div>
				<Link href={`/teacher/your-courses/${course._id}`}>
					<Button className='w-full'>Edit</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

export default CourseItem
