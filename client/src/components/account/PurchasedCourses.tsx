'use client'

import { useCallback, useEffect, useState } from 'react'
import { courseAPI } from '../../../api/course'
import { useToast } from '../ui/use-toast'
import CourseCard from '../courses/CourseCard'
import Loading from '../Loading'

const PurchasedCourses = () => {
	const { toast } = useToast()
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(false)

	const getPurchasedCourses = useCallback(async () => {
		setLoading(true)
		const response = await courseAPI.getPurchasedCourses()

		if (response.ok) {
			setCourses(response.courses)
		} else {
			toast({
				title: 'Error',
				description:
					response.message || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}, [toast])

	useEffect(() => {
		getPurchasedCourses()
	}, [getPurchasedCourses])

	return (
		<div className='grid grid-cols-1 gap-8'>
			{loading && <Loading />}
			{courses.length > 0 &&
				courses.map((course: any) => (
					<CourseCard
						key={course._id}
						course={course}
						isPurchased={true}
					/>
				))}
			{!loading && courses && courses.length === 0 && (
				<p className='text-center text-lg'>No courses purchased</p>
			)}
		</div>
	)
}

export default PurchasedCourses
