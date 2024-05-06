import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginSchema } from '@/lib/zod'
import { z } from 'zod'

const EmailInput = ({
  formData,
  setFormData,
}: {
  formData: z.infer<typeof LoginSchema>
  setFormData: React.Dispatch<React.SetStateAction<z.infer<typeof LoginSchema>>>
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
