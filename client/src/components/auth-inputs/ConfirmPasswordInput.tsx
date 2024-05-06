import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ConfirmPasswordInput = ({
	formData,
	setFormData,
}: {
	formData: any
	setFormData: React.Dispatch<React.SetStateAction<any>>
}) => {
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, confirmPassword: e.target.value })
	}

	return (
		<>
			<Label htmlFor='confirmPassword'>Confirm Password</Label>
			<Input
				id='confirmPassword'
				type='password'
				required
				placeholder='Confirm password'
				onChange={handlePasswordChange}
			/>
		</>
	)
}

export default ConfirmPasswordInput
