'use client'

import { TabsContent } from '@/components/ui/tabs'
import TabItem from './TabItem'
import { TabType } from '@/lib/types'
import { useState } from 'react'

const data: TabType[] = [
	{
		id: 1,
		title: 'The MERN Stack: MongoDB, Express, React, Node.js',
		yap: 'Build full-stack web applications using the MERN stack.',
		diff: 'Advanced',
		duration: '16 hours',
	},
	{
		id: 2,
		title: 'MEAN Stack Development',
		yap: 'Learn to develop web applications with MongoDB, Express, Angular, and Node.js.',
		diff: 'Advanced',
		duration: '14 hours',
	},
	{
		id: 3,
		title: 'Ruby on Rails: Web Development Framework',
		yap: 'Explore Ruby on Rails framework for building web applications.',
		diff: 'Intermediate',
		duration: '10 hours',
	},
]

const PathsTabs = () => {
	const [activeItem, setActiveItem] = useState<number>(1)

	return (
		<TabsContent
			value='paths'
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

export default PathsTabs
