'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { teacherAPI } from '../../../api/teacher'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

const DeleteButton = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const { toast } = useToast()
	const router = useRouter()

	const handleDelete = async () => {
		setLoading(true)
		const response = await teacherAPI.deleteCourse(id)

		if (response.ok) {
			setTimeout(() => {
				router.push('/teacher/your-courses')
			}, 1500)
		} else {
			setLoading(false)

			toast({
				title: 'Error',
				description: response.statusText,
				variant: 'destructive',
			})
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<span className='inline-flex h-9 w-24 items-center justify-center whitespace-nowrap rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
					{loading ? 'Deleting...' : 'Delete'}
				</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						course and remove it from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className='bg-red-700 text-white'
						onClick={handleDelete}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteButton
