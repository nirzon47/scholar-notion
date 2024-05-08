'use client'

import { TabsContent } from '@/components/ui/tabs'
import TabItem from './TabItem'
import { TabType } from '@/lib/types'
import { useState } from 'react'

const data: TabType[] = [
	{
		id: 1,
		title: 'Introduction to HTML',
		yap: 'Learn the fundamentals of HTML and its structure.',
		diff: 'Beginner',
		duration: '4 hours',
	},
	{
		id: 2,
		title: 'CSS Styling and Layout',
		yap: 'Master CSS to style and layout web pages.',
		diff: 'Intermediate',
		duration: '8 hours',
	},
	{
		id: 3,
		title: 'JavaScript Essentials',
		yap: 'Explore the basics of JavaScript programming.',
		diff: 'Beginner',
		duration: '6 hours',
	},
]

const FreeTabs = () => {
	const [activeItem, setActiveItem] = useState<number>(1)

	return (
		<TabsContent
			value='free'
			className='grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-2 lg:grid-cols-3'
		>
			{data.map((item) => (
				<TabItem
					key={item.id}
					item={item}
					activeItem={activeItem}
					setActiveItem={setActiveItem}
				/>
			))}
		</TabsContent>
	)
}

export default FreeTabs
