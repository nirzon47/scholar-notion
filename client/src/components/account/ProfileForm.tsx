'use client'

import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { DatePicker } from '../ui/date-picker'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { profileAPI } from '../../../api/profile'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'

const ProfileForm = () => {
	const [date, setDate] = useState<Date>()
	const [gender, setGender] = useState<string>()
	const [about, setAbout] = useState<string>()
	const [number, setNumber] = useState<string>()
	const [loading, setLoading] = useState<boolean>(false)
	const { toast } = useToast()

	useEffect(() => {
		// Get data from server and set to state
		const getProfile = async () => {
			try {
				setLoading(true)
				const initialData = await profileAPI.getProfile()

				// If no data or error, handle
				if (initialData instanceof Error) {
					toast({
						title: 'Error',
						description: initialData.message,
						variant: 'destructive',
					})

					return
				}

				if (!initialData) return

				// Set data if data exists
				setDate(new Date(initialData.dob))
				setGender(initialData.gender)
				setAbout(initialData.about)
				setNumber(initialData.contactNumber)
			} finally {
				setLoading(false)
			}
		}

		getProfile()
	}, [toast])

	const updateProfile = async () => {
		const changes: any = {}

		// Set data if data exists
		if (date) changes['dob'] = new Date(date!)
		if (gender) changes['gender'] = gender
		if (about) changes['about'] = about
		if (number) changes['contactNumber'] = number

		const updatedProfile = await profileAPI.updateProfile({ changes })

		// If error, handle
		if (updatedProfile instanceof Error) {
			toast({
				title: 'Error',
				description: updatedProfile.message,
				variant: 'destructive',
			})
		} else {
			toast({
				title: 'Success',
				description: 'Profile updated successfully',
			})
		}
	}

	const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		updateProfile()
	}

	return (
		<form onSubmit={handleProfileUpdate}>
			{loading && (
				<div className='flex justify-center'>
					<Image src={'/loader.svg'} alt='loader' width={50} height={50} />
				</div>
			)}
			<Label htmlFor={'gender'} className='block'>
				Gender
			</Label>
			<Select onValueChange={(e) => setGender(e)}>
				<SelectTrigger className='mb-6 mt-2'>
					<SelectValue
						placeholder={
							gender
								? gender.charAt(0).toUpperCase() + gender.slice(1)
								: 'Select Gender'
						}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='male'>Male</SelectItem>
						<SelectItem value='female'>Female</SelectItem>
						<SelectItem value='other'>Other</SelectItem>
						<SelectItem value='prefer-not-saying'>
							Prefer not to say
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Label htmlFor={'dob'} className='mb-2 block'>
				Date of Birth
			</Label>
			<DatePicker date={date} setDate={setDate} id={'dob'} />
			<Label htmlFor={'about'} className='mb-2 mt-6 block'>
				About You
			</Label>
			<Textarea
				id={'about'}
				value={about}
				placeholder='Tell us something about yourself'
				onChange={(e) => setAbout(e.target.value)}
			/>
			<Label htmlFor={'contactNumber'} className='mb-2 mt-6 block'>
				Contact Number
			</Label>
			<Input
				id={'contactNumber'}
				type={'number'}
				inputMode='tel'
				value={Number(number) || ''}
				placeholder='Enter Contact Number'
				onChange={(e) => setNumber(e.target.value)}
			/>
			<Button className='mt-4' type='submit'>
				Submit
			</Button>
		</form>
	)
}

export default ProfileForm
