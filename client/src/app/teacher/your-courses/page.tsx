'use client'

import { useCallback, useEffect, useState } from 'react'
import { teacherAPI } from '../../../../api/teacher'
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
			const response = await teacherAPI.getYourCourses()

			if (response.ok) {
				setCourses(response.courses)
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
			{courses?.length === 0 && (
				<p className='text-center'>No courses found</p>
			)}
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
