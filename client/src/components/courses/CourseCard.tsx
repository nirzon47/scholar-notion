import { CourseType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Hash } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CourseCard = ({ course }: { course: CourseType }) => {
	const router = useRouter()

	return (
		<Card
			className='cursor-pointer duration-150 hover:scale-[1.0125]'
			onClick={() => router.push(`/course/${course._id}`)}
		>
			<Image
				src={course.thumbnail || '/placeholder.svg'}
				alt={course.name}
				width={600}
				height={600}
				quality={75}
				className='h-40 w-full rounded-tl-xl rounded-tr-xl object-cover object-center'
			/>
			<CardHeader>
				<CardTitle className='text-xl md:text-2xl'>{course.name}</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<p className='h-24 text-sm text-zinc-900 dark:text-zinc-300 md:text-base'>
					{course.desc}
				</p>
				<p className='flex h-14 items-center gap-2 text-sm font-light text-zinc-800 dark:text-zinc-400 md:text-base'>
					<Hash /> Tags: {course.tags.split(',').join(', ')}
				</p>
				<div className='flex items-center justify-between md:text-lg'>
					<p className='font-bold'>Price: ₹{course.price}</p>
					<p className='font-bold'>Enrolled: {course.students.length}</p>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<Button className='w-full'>Buy Now</Button>
					<Button className='w-full' variant='outline'>
						Add to Cart
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default CourseCard
