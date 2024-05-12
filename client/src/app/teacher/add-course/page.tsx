import CourseForm from '@/components/teacher/CourseForm'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const AddCourse = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Add Course</CardTitle>
					<CardDescription>Add your new course</CardDescription>
				</CardHeader>
				<CardContent>
					<CourseForm />
				</CardContent>
			</Card>
		</>
	)
}

export default AddCourse
