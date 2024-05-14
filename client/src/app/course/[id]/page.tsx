'use client'

import { useToast } from '@/components/ui/use-toast'
import { CourseType } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'
import { courseAPI } from '../../../../api/course'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Loading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GradientText from '@/components/GradientText'

const CourseInfo = ({ params }: { params: { id: string } }) => {
	const [course, setCourse] = useState<CourseType>()
	const [loading, setLoading] = useState(false)
	const { toast } = useToast()

	const getCourse = useCallback(async () => {
		setLoading(true)
		const response = await courseAPI.getSpecificCourse(params.id)

		if (response.ok) {
			setCourse(response.course)
		} else {
			toast({
				title: 'Error',
				description: 'Something went wrong. Please try again.',
				duration: 3000,
				variant: 'destructive',
			})
		}

		setLoading(false)
	}, [params.id, toast])

	useEffect(() => {
		getCourse()
	}, [getCourse])

	return (
		<div>
			<div className='flex h-80 flex-col items-center justify-center bg-gradient-to-b from-primary/50 to-transparent'>
				{loading && (
					<div className='my-16 flex justify-center'>
						<Loading />
					</div>
				)}
				<div className='mx-auto w-full max-w-6xl p-4'>
					<h1 className='md:5xl text-4xl font-bold'>{course?.name}</h1>
				</div>
			</div>
			<main className='mx-auto my-12 flex w-full max-w-6xl flex-wrap items-center justify-between gap-20 p-4'>
				<Image
					src={course?.thumbnail || '/placeholder.svg'}
					alt={course?.name || 'Course thumbnail'}
					width={300}
					height={300}
					className='w-80 rounded-lg bg-cover bg-center md:w-96'
				/>
				<div>
					<p className='mb-4 max-w-lg text-lg'>{course?.desc}</p>
					<div className='mb-8 flex flex-wrap gap-4'>
						{course?.tags.split(',').map((tag) => (
							<span
								key={tag}
								className='rounded bg-primary/20 px-4  py-1'
							>
								{tag.toUpperCase()}
							</span>
						))}
					</div>
					<div>
						<p className='mb-4 text-2xl font-bold'>
							Price: {course?.price}
						</p>
						<div className='flex gap-4'>
							<Button variant='outline'>Add to cart</Button>
							<Button>Buy Now</Button>
						</div>
					</div>
				</div>

				<Card className='w-full'>
					<CardHeader>
						<CardTitle>About the instructor</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className='mb-2 text-3xl font-semibold'>
							<GradientText
								text={course?.instructor.name || 'Instructor'}
							/>
						</h2>
						<p className='whitespace-pre-line'>
							{course?.instructor.profile.about}
						</p>
					</CardContent>
				</Card>
			</main>
		</div>
	)
}

export default CourseInfo
