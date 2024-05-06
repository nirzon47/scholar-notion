import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'

const RoleSelect = ({
	formData,
	setFormData,
}: {
	formData: any
	setFormData: React.Dispatch<React.SetStateAction<any>>
}) => {
	const handleSelectChange = (value: string) => {
		setFormData({ ...formData, role: value })
	}

	return (
		<>
			<Label htmlFor='role' className='text-sm'>
				Role
			</Label>
			<Select onValueChange={handleSelectChange}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Student' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='student'>Student</SelectItem>
					<SelectItem value='teacher'>Teacher</SelectItem>
					<SelectItem value='admin'>Admin</SelectItem>
				</SelectContent>
			</Select>
		</>
	)
}

export default RoleSelect
