'use client'

import { useCallback, useEffect, useState } from 'react'
import { orderAPI } from '../../../../../api/order'
import { OrderType } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'
import { Check, Clock, Hash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import Script from 'next/script'

const OrderPage = ({ params }: { params: { id: string } }) => {
	const [order, setOrder] = useState<OrderType>()
	const [date, setDate] = useState<string>()
	const { toast } = useToast()
	const [loading, setLoading] = useState<boolean>(true)

	const getOrder = useCallback(async () => {
		const response = await orderAPI.getSpecificOrder(params.id)

		if (response.ok) {
			setOrder(response.order)

			const dateLocale = new Date(
				response.order.created,
			).toLocaleDateString()

			setDate(dateLocale)
		} else {
			toast({
				title: response.message,
				description: response.error || 'Please try again later',
				variant: 'destructive',
			})
		}

		setLoading(false)
	}, [params.id, toast])

	const handleRetry = async () => {
		// Payment options
		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: order!.total * 100,
			currency: 'INR',
			name: 'ScholarNotion',
			description: 'Course Purchase',
			image: '/logo.png',
			order_id: order!.paymentId,
			handler: async (res: any) => {
				const id = order!._id

				await orderAPI.verifyPayment(id, res.razorpay_payment_id)

				toast({
					title: 'Success',
					description: 'Course purchased successfully',
				})

				setTimeout(() => {
					window.location.reload()
				}, 1500)
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
	}

	useEffect(() => {
		getOrder()
	}, [getOrder])

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<Script
						id='razorpay-checkout-js'
						src='https://checkout.razorpay.com/v1/checkout.js'
					/>
					<div>
						<h1 className='mb-12 flex items-center gap-2 text-center text-2xl font-semibold md:text-left md:text-3xl'>
							Order ID{' '}
							<div className='flex items-center gap-1'>
								<Hash className='h-10 w-10 text-primary' />
								<span className='w-32 truncate text-primary md:w-full'>
									{order?._id}
								</span>
							</div>
						</h1>
						<Card className='my-8'>
							<CardHeader>
								<CardTitle>Order Details</CardTitle>
							</CardHeader>
							<CardContent>
								<h2 className='mb-4 text-2xl font-bold'>
									Order Details
								</h2>
								<div className='mb-8 grid gap-4'>
									<div className='flex items-center gap-2'>
										<Clock />
										<p>
											Created:{' '}
											<span className='font-bold text-primary'>
												{date}
											</span>
										</p>
									</div>
									<div>
										<p className='flex flex-wrap items-center gap-2'>
											Payment Status:{' '}
											{order?.status === 'completed' ? (
												<>
													<span className='text-green-500'>
														Paid
													</span>
													<Check color='green' />
												</>
											) : (
												<div className='flex items-center justify-between gap-2'>
													<div className='flex items-center gap-2'>
														<span className='text-yellow-500'>
															Pending
														</span>
														<Clock color='yellow' />
													</div>
													<Button
														variant={'outline'}
														onClick={handleRetry}
													>
														Retry Payment
													</Button>
												</div>
											)}
										</p>
									</div>
								</div>

								<h2 className='mb-4 text-2xl font-bold'>
									Courses in the order
								</h2>
								<div className='space-y-6'>
									{order?.courses.map((course) => (
										<div
											key={course._id}
											className='flex flex-col gap-2'
										>
											<Image
												src={course.thumbnail}
												alt={course.name}
												width={1000}
												height={1000}
												quality={100}
												className='h-24 w-full rounded-lg object-cover'
											/>
											<Link href={`/course/${course._id}`}>
												<h2 className='text-xl font-semibold text-primary underline underline-offset-4 duration-150 hover:text-yellow-600'>
													{course.name}
												</h2>
											</Link>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</>
	)
}

export default OrderPage
