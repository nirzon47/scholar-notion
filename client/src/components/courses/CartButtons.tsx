'use client'

import Script from 'next/script'
import { Button } from '../ui/button'
import { orderAPI } from '../../../api/order'
import { useToast } from '../ui/use-toast'
import { cartAPI } from '../../../api/cart'

const CartButtons = ({ id }: { id: string }) => {
	const { toast } = useToast()

	const handleBuyNow = async () => {
		const response = await orderAPI.buyNow(id)

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

	const handleAddToCart = async () => {
		const response = await cartAPI.addToCart(id)

		if (response.ok) {
			toast({
				title: 'Success',
				description: 'Course added to cart successfully',
			})
		} else {
			toast({
				title: 'Error',
				description:
					response.message || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}
	}

	return (
		<>
			<Script
				id='razorpay-checkout-js'
				src='https://checkout.razorpay.com/v1/checkout.js'
			/>
			<div className='grid grid-cols-2 gap-4'>
				<Button className='w-full' onClick={handleBuyNow}>
					Buy Now
				</Button>
				<Button
					className='w-full'
					variant='outline'
					onClick={handleAddToCart}
				>
					Add to Cart
				</Button>
			</div>
		</>
	)
}

export default CartButtons
