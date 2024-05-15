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
						<Button>Proceed to Checkout</Button>
					</div>
				</CardFooter>
			)}
		</CardContent>
	)
}

export default CartContent
