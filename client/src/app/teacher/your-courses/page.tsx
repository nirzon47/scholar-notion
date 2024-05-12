'use client'

import { useCallback, useEffect, useState } from 'react'
import { courseAPI } from '../../../../api/course'
import { useToast } from '@/components/ui/use-toast'
import Loading from '@/components/Loading'
import CourseItem from '@/components/teacher/CourseItem'
import { CourseType } from '@/lib/types'

const YourCourses = () => {
	const [courses, setCourses] = useState<CourseType[]>()
	const [loading, setLoading] = useState<boolean>(false)
	const { toast } = useToast()

	const getCourses = useCallback(async () => {
		setLoading(true)
		try {
			const response = await courseAPI.getYourCourses()

			if (response.ok) {
				setCourses(response.courses)
				console.log(response)
			} else {
				toast({
					title: 'Error',
					description: 'Something went wrong. Please try again.',
					duration: 3000,
					variant: 'destructive',
				})
			}
		} finally {
			setLoading(false)
		}
	}, [toast])

	useEffect(() => {
		getCourses()
	}, [getCourses])

	return (
		<>
			{loading && <Loading />}
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{courses?.map((course) => (
					<CourseItem key={course._id} course={course} />
				))}
			</div>
		</>
	)
}

export default YourCourses
