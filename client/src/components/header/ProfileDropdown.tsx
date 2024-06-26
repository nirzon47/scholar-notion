import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LogoutItem from './LogoutItem'
import Link from 'next/link'

const ProfileDropdown = ({ user }: { user: any }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={'/pfp.avif'} alt={user.name} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Hello {user.name}!</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href={'/account/profile'}>
					<DropdownMenuItem>Profile</DropdownMenuItem>
				</Link>
				{user.role === 'teacher' && (
					<Link href={'/teacher/your-courses'}>
						<DropdownMenuItem>Your Courses</DropdownMenuItem>
					</Link>
				)}
				<Link href='/settings'>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='text-red-500'>
					<LogoutItem />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProfileDropdown
