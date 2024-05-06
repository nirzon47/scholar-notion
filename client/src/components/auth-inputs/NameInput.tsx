import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const NameInput = ({
	formData,
	setFormData,
}: {
	formData: any
	setFormData: React.Dispatch<React.SetStateAction<any>>
}) => {
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, name: e.target.value })
	}

	return (
		<>
			<Label htmlFor='name'>Name</Label>
			<Input
				id='name'
				type='text'
				placeholder='Enter Name'
				required
				onChange={handleNameChange}
			/>
		</>
	)
}

export default NameInput
