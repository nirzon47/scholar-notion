'use client'

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { CardContent, CardFooter } from '../ui/card'
import { useCallback, useEffect, useState } from 'react'
import { cartAPI } from '../../../api/cart'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import Link from 'next/link'
import Loading from '../Loading'
import { orderAPI } from '../../../api/order'

const CartContent = () => {
	const [cart, setCart] = useState<any>()
	const { toast } = useToast()
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState<boolean>(false)

	const getCart = useCallback(async () => {
		setLoading(true)

		const response = await cartAPI.getCart()

		if (response.ok && response.cart) {
			setCart(response.cart.courses)

			const total = response.cart.courses.reduce(
				(acc: number, item: any) => item.price + acc,
				0,
			)
			setTotal(total)
		} else {
			toast({
				title: 'Error',
				description: response.error || 'Cart Empty',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}, [toast])

	const handleCheckout = async () => {
		const response = await orderAPI.buyCart()

		if (response.ok) {
			// Payment options
			const options = {
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: response.order.total * 100,
				currency: 'INR',
				name: 'ScholarNotion',
				description: 'Course Purchase',
				image: '/logo.png',
				order_id: response.id,
				handler: async (res: any) => {
					const id = response.order._id

					await orderAPI.verifyPayment(id, res.razorpay_payment_id)

					toast({
						title: 'Success',
						description: 'Course purchased successfully',
					})

					setCart([])
					setTotal(0)
				},
			}

			// @ts-ignore
			const paymentObject = new window.Razorpay(options)

			// Handles payment errors
			paymentObject.on('payment.failed', () => {
				toast({
					title: 'Error',
					description: 'Something went wrong. Please try again.',
					variant: 'destructive',
				})
			})

			paymentObject.open()
		} else {
			toast({
				title: 'Error',
				description:
					response.message || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}
	}

	useEffect(() => {
		getCart()
	}, [getCart])

	return (
		<CardContent>
			{loading && (
				<div className='flex justify-center'>
					<Loading />
				</div>
			)}
			{!cart && !loading && <p className='text-center'>Cart is empty</p>}
			{!loading &&
				cart &&
				cart?.map((item: any) => (
					<div key={item.id}>
						<div className='grid gap-4'>
							<div className='grid items-center gap-4 md:grid-cols-[80px_1fr_auto]'>
								<Image
									alt={item.name}
									className='rounded-md object-cover'
									height={80}
									src={item.thumbnail || '/placeholder.svg'}
									style={{
										aspectRatio: '80/80',
										objectFit: 'cover',
									}}
									width={80}
								/>
								<div className='grid gap-1'>
									<h3 className='font-medium'>{item.name}</h3>
									<p className='max-w-52 truncate text-sm text-gray-500 dark:text-gray-400'>
										{item.desc}
									</p>
								</div>
								<div className='grid gap-1 md:text-right'>
									<p className='font-medium'>₹{item.price}</p>
									<div className='flex items-center justify-end gap-2'></div>
								</div>
							</div>
						</div>
						<Separator className='my-4 w-full' />
					</div>
				))}
			{!loading && (
				<CardFooter className='flex flex-col items-center justify-between gap-6 md:flex-row'>
					<div className='text-lg font-medium'>Total: ₹{total}</div>
					<div className='flex flex-wrap items-center justify-center gap-2'>
						<Link href={'/courses'}>
							<Button variant='outline'>Continue Shopping</Button>
						</Link>
						<Button onClick={handleCheckout}>Proceed to Checkout</Button>
					</div>
				</CardFooter>
			)}
		</CardContent>
	)
}

export default CartContent
