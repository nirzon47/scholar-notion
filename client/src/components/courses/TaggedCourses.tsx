'use client'

import { useCallback, useEffect, useState } from 'react'
import { courseAPI } from '../../../api/course'
import { useToast } from '../ui/use-toast'
import CourseCard from './CourseCard'

const TaggedCourses = ({ tag }: { tag: string }) => {
	const [courses, setCourses] = useState([])
	const { toast } = useToast()

	const getCourses = useCallback(async () => {
		const response = await courseAPI.getCourseByTag(tag)

		if (response.ok) {
			setCourses(response.courses)
		} else {
			toast({
				title: 'Error',
				description: response.error,
				variant: 'destructive',
			})
		}
	}, [toast, tag])

	useEffect(() => {
		getCourses()
	}, [getCourses])

	return (
		<main>
			{courses && courses.length === 0 && <p>No courses found</p>}
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
				{courses &&
					courses.length > 0 &&
					courses.map((course: any) => (
						<CourseCard key={course._id} course={course} />
					))}
			</div>
		</main>
	)
}

export default TaggedCourses
