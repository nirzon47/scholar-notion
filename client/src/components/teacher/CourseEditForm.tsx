'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { teacherAPI } from '../../../api/teacher'
import { useToast } from '../ui/use-toast'
import { courseAPI } from '../../../api/course'
import DeleteButton from './DeleteButton'

const CourseEditForm = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState<boolean>(false)
	// Form states
	const [name, setName] = useState<string>('')
	const [desc, setDesc] = useState<string>('')
	const [tags, setTags] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	const [thumbnail, setThumbnail] = useState<File | null>()
	const { toast } = useToast()

	// Edit course
	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setLoading(true)

		try {
			if (!name || !desc || !tags || !price) {
				toast({
					title: 'Error',
					description: 'All fields are required',
					variant: 'destructive',
				})

				return
			}
			const formData: any = { name, desc, tags, price, thumbnail }

			const response = await teacherAPI.editCourse(formData, id)

			if (response.ok) {
				setName('')
				setDesc('')
				setTags('')
				setPrice(0)
				setThumbnail(null)

				toast({
					title: 'Success',
					description: 'Course edited successfully',
				})
			} else {
				toast({
					title: 'Error',
					description: response.message || 'Something went wrong',
					variant: 'destructive',
				})
			}
		} finally {
			setLoading(false)
		}
	}

	// Get course
	const getCourse = useCallback(async () => {
		try {
			setLoading(true)

			const response = await courseAPI.getSpecificCourse(id)

			if (response.ok) {
				const { name, desc, tags, price, thumbnail } = response.course
				setName(name)
				setDesc(desc)
				setTags(tags)
				setPrice(price)
			}
		} finally {
			setLoading(false)
		}
	}, [id])

	useEffect(() => {
		getCourse()
	}, [getCourse])

	return (
		<form className='grid gap-6' onSubmit={handleFormSubmit}>
			{loading && (
				<div className='flex justify-center'>
					<Image src={'/loader.svg'} alt='loader' width={50} height={50} />
				</div>
			)}
			<div className='grid gap-2'>
				<Label htmlFor='course-name'>Course Name</Label>
				<Input
					id='course-name'
					type='text'
					placeholder='Enter Course Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='grid gap-2'>
				<Label htmlFor='course-desc'>Course Description</Label>
				<Textarea
					id='course-desc'
					placeholder='Describe your course'
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div className='grid gap-2'>
					<Label htmlFor='course-desc'>Tags</Label>
					<Input
						id='course-desc'
						type='text'
						placeholder='e.g., html,web development,css'
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='price'>Price</Label>
					<Input
						id='price'
						type='number'
						placeholder='1000'
						value={Number(price) || ''}
						onChange={(e) => setPrice(Number(e.target.value))}
					/>
				</div>
			</div>
			<div className='grid gap-2'>
				<Label htmlFor='course-desc'>Upload Thumbnail (optional)</Label>
				<Input
					id='course-desc'
					type='file'
					onChange={(e) => setThumbnail(e.target.files?.[0])}
				/>
			</div>
			<div className='flex justify-between'>
				<Button className='w-24'>Edit</Button>
				<DeleteButton id={id} />
			</div>
		</form>
	)
}

export default CourseEditForm
