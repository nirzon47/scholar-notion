'use client'

import { useCallback, useEffect, useState } from 'react'
import { courseAPI } from '../../../api/course'
import { useToast } from '../ui/use-toast'
import CourseCard from './CourseCard'
import Loading from '../Loading'

const TaggedCourses = ({ tag }: { tag: string }) => {
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(false)
	const { toast } = useToast()

	const getCourses = useCallback(async () => {
		setLoading(true)
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

		setLoading(false)
	}, [toast, tag])

	useEffect(() => {
		getCourses()
	}, [getCourses])

	return (
		<main>
			{loading && <Loading />}
			{!loading && courses && courses.length === 0 && (
				<div className='text-center'>No courses found</div>
			)}
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
