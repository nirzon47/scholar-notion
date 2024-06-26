import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PasswordInput = ({
	formData,
	setFormData,
}: {
	formData: any
	setFormData: React.Dispatch<React.SetStateAction<any>>
}) => {
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, password: e.target.value })
	}

	return (
		<>
			<Label htmlFor='password'>Password</Label>
			<Input
				id='password'
				type='password'
				required
				placeholder='Enter password'
				onChange={handlePasswordChange}
			/>
		</>
	)
}

export default PasswordInput
