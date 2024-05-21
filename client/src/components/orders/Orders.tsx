'use client'

import { useCallback, useEffect, useState } from 'react'
import { orderAPI } from '../../../api/order'
import { useToast } from '../ui/use-toast'
import OrderItem from './OrderItem'
import Loading from '../Loading'

const Orders = () => {
	const [orders, setOrders] = useState([])
	const { toast } = useToast()
	const [loading, setLoading] = useState<boolean>(true)

	const getOrders = useCallback(async () => {
		const response = await orderAPI.getOrders()

		if (response.ok) {
			setOrders(response.orders.reverse())
		} else {
			toast({
				title: 'Error',
				description:
					response.error || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}, [toast])

	useEffect(() => {
		getOrders()
	}, [getOrders])

	return (
		<div className='grid grid-cols-1 gap-4 p-4'>
			{loading && <Loading />}
			{!loading && orders && orders.length === 0 && (
				<div className='flex justify-center'>
					<p className='text-center'>No orders found.</p>
				</div>
			)}
			{orders &&
				orders.length > 0 &&
				orders.map((order: any) => {
					return <OrderItem key={order._id} order={order} />
				})}
		</div>
	)
}

export default Orders
