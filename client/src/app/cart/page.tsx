import { CardTitle, CardHeader, Card } from '@/components/ui/card'
import CartContent from '@/components/cart/CartContent'

const Cart = () => {
	return (
		<div className='min-h-[calc(100vh-3.5rem)] overflow-x-hidden px-4 py-12'>
			<h1 className='mx-auto mb-8 max-w-6xl text-3xl font-bold'>
				Your Cart
			</h1>
			<Card className='mx-auto w-full max-w-6xl'>
				<CardHeader>
					<CardTitle>Courses</CardTitle>
				</CardHeader>
				<CartContent />
			</Card>
		</div>
	)
}

export default Cart
