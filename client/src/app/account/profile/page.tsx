import ProfileForm from '@/components/account/ProfileForm'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const AccountLayout = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Update your profile information</CardDescription>
			</CardHeader>
			<CardContent>
				<ProfileForm />
			</CardContent>
		</Card>
	)
}

export default AccountLayout
