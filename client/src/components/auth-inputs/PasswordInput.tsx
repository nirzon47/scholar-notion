import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginSchema } from '@/lib/zod'
import { z } from 'zod'

const PasswordInput = ({
	formData,
	setFormData,
}: {
	formData: z.infer<typeof LoginSchema>
	setFormData: React.Dispatch<
		React.SetStateAction<z.infer<typeof LoginSchema>>
	>
}) => {
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, password: e.target.value })
	}

	return (
		<>
			{' '}
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
