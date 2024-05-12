'use client'

import CourseEditForm from '@/components/teacher/CourseEditForm'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

const CourseEdit = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Course</CardTitle>
				<CardDescription>Edit your existing course</CardDescription>
			</CardHeader>
			<CardContent>
				<CourseEditForm />
				<Link
					href='/teacher/your-courses'
					className='mt-4 inline-block text-primary hover:underline'
				>
					Go back
				</Link>
			</CardContent>
		</Card>
	)
}

export default CourseEdit
