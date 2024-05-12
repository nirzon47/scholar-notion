import { RocketIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const UnverifiedAlert = () => {
	return (
		<Alert>
			<RocketIcon className='h-4 w-4' />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>Your account is not verified!</AlertDescription>
		</Alert>
	)
}

export default UnverifiedAlert
