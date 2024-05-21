import { OrderType } from '@/lib/types'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import CourseArray from './CourseArray'
import { Check, ChevronRight, Clock, Hash } from 'lucide-react'
import { Button } from '../ui/button'

const OrderItem = ({ order }: { order: OrderType }) => {
	const date = new Date(order.created)

	return (
		<Card>
			<CardHeader>
				<CardTitle className='mb-1 flex flex-wrap items-center justify-between gap-2'>
					<span className='flex items-center gap-4'>
						Order ID{' '}
						<span className='flex items-center gap-1 text-primary'>
							<Hash size={20} />
							{order._id.substring(16)}
						</span>
					</span>
					<span className='flex items-center gap-2 font-normal'>
						<Clock size={20} /> Created on: {date.toLocaleDateString()}
					</span>
				</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className='grid gap-6'>
				<div className='flex flex-wrap items-center justify-between gap-2'>
					<CourseArray courses={order.courses} />
					<Button className='flex items-center gap-2'>
						View Details <ChevronRight size={16} />
					</Button>
				</div>
				<div className='flex justify-between'>
					<p>Total: ₹{order.total}</p>
					<p className='flex items-center gap-2'>
						Payment Status:{' '}
						{order.status === 'completed' ? (
							<Check color='green' />
						) : (
							<Clock color='yellow' />
						)}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default OrderItem
