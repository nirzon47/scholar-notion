'use client'

import { authAPI } from '../../../api/auth'
import { useToast } from '../ui/use-toast'
import { useSetAtom } from 'jotai'
import { tokenAtom } from '@/lib/atoms'

const LogoutItem = () => {
	const { toast } = useToast()
	const setToken = useSetAtom(tokenAtom)

	const handleLogout = async () => {
		// Call logout API
		const response = await authAPI.logout()

		if (response.ok) {
			toast({
				title: 'Logout successful',
				description: 'You have successfully logged out.',
				duration: 3000,
			})

			setToken('')

			window.location.replace('/')
		} else {
			toast({
				title: 'Logout failed',
				description: 'Something went wrong. Please try again.',
				duration: 3000,
				variant: 'destructive',
			})
		}
	}

	return (
		<span className='inline-block h-full w-full' onClick={handleLogout}>
			Logout
		</span>
	)
}

export default LogoutItem
