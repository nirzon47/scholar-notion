import { CourseType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Hash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CartButtons from './CartButtons'
import clsx from 'clsx'

const CourseCard = ({
	course,
	isPurchased,
}: {
	course: CourseType
	isPurchased: boolean
}) => {
	return (
		<Card>
			<Image
				src={course.thumbnail || '/placeholder.svg'}
				alt={course.name}
				width={600}
				height={600}
				quality={75}
				className='h-40 w-full rounded-tl-xl rounded-tr-xl object-cover object-center'
			/>
			<CardHeader>
				<Link href={`/course/${course._id}`}>
					<CardTitle className='text-xl underline underline-offset-4 duration-150 hover:text-primary md:text-2xl'>
						{course.name}
					</CardTitle>
				</Link>
			</CardHeader>
			<CardContent className='grid gap-4'>
				<p className='h-24 text-sm text-zinc-900 dark:text-zinc-300 md:text-base'>
					{course.desc}
				</p>
				<p className='flex h-14 items-center gap-2 text-sm font-light text-zinc-800 dark:text-zinc-400 md:text-base'>
					<Hash /> Tags: {course.tags.split(',').join(', ')}
				</p>
				<div
					className={clsx(
						'flex items-center justify-between md:text-lg',
						isPurchased && 'hidden',
					)}
				>
					<p className='font-bold'>Price: ₹{course.price}</p>
					<p className='font-bold'>Enrolled: {course.students.length}</p>
				</div>
				{!isPurchased && <CartButtons id={course._id} />}
			</CardContent>
		</Card>
	)
}

export default CourseCard
