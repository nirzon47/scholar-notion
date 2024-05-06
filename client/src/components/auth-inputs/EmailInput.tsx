import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const EmailInput = ({
	formData,
	setFormData,
}: {
	formData: any
	setFormData: React.Dispatch<React.SetStateAction<any>>
}) => {
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, email: e.target.value })
	}

	return (
		<>
			<Label htmlFor='email'>Email</Label>
			<Input
				id='email'
				type='email'
				placeholder='Enter Email'
				required
				onChange={handleEmailChange}
			/>
		</>
	)
}

export default EmailInput
