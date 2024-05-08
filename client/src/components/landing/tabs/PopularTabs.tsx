'use client'

import { TabsContent } from '@/components/ui/tabs'
import TabItem from './TabItem'
import { TabType } from '@/lib/types'
import { useState } from 'react'

const data: TabType[] = [
	{
		id: 1,
		title: 'Mastering Next.js',
		yap: 'Learn to build server-rendered React applications with Next.js.',
		diff: 'Intermediate',
		duration: '8 hours',
	},
	{
		id: 2,
		title: 'React.js Fundamentals',
		yap: 'Explore the core concepts of React.js and build modern web applications.',
		diff: 'Beginner',
		duration: '6 hours',
	},
	{
		id: 3,
		title: 'Tailwind CSS: Utility-First CSS',
		yap: 'Discover the utility-first approach to CSS with Tailwind CSS.',
		diff: 'Intermediate',
		duration: '4 hours',
	},
]

const PopularTabs = () => {
	const [activeItem, setActiveItem] = useState<number>(1)

	return (
		<TabsContent
			value='popular'
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

export default PopularTabs
