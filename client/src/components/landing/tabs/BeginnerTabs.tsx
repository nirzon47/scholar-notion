'use client'

import { TabsContent } from '@/components/ui/tabs'
import TabItem from './TabItem'
import { TabType } from '@/lib/types'
import { useState } from 'react'

const data: TabType[] = [
	{
		id: 1,
		title: 'Introduction to Programming',
		yap: 'Learn the fundamental concepts of programming.',
		diff: 'Beginner',
		duration: '6 hours',
	},
	{
		id: 2,
		title: 'Data Structures and Algorithms',
		yap: 'Explore data structures and algorithms for efficient problem-solving.',
		diff: 'Intermediate',
		duration: '12 hours',
	},
	{
		id: 3,
		title: 'Object-Oriented Programming with Java',
		yap: 'Understand the principles of object-oriented programming using Java.',
		diff: 'Intermediate',
		duration: '10 hours',
	},
]

const BeginnerTabs = () => {
	const [activeItem, setActiveItem] = useState<number>(1)

	return (
		<TabsContent
			value='beginner'
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

export default BeginnerTabs
