import { TabType } from '@/lib/types'
import { CodeIcon, PersonIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

const TabItem = ({
	item,
	activeItem,
	setActiveItem,
}: {
	item: TabType
	activeItem: number
	setActiveItem: any
}) => {
	return (
		<div
			className={clsx(
				'flex h-80 cursor-pointer flex-col justify-between gap-y-24 p-6 duration-150 hover:bg-slate-600',
				activeItem === item.id && 'shadow-[7px_7px_0px_0px_#22d3ee]',
				activeItem === item.id ? 'bg-slate-700' : 'bg-slate-900',
			)}
			onClick={() => setActiveItem(item.id)}
		>
			<div>
				<h4 className='mb-4 text-xl font-semibold text-white'>
					{item.title}
				</h4>
				<p className='font-light text-zinc-400'>{item.yap}</p>
			</div>
			<div className='flex justify-between text-sm'>
				<div className='flex items-center gap-2 text-zinc-400'>
					<PersonIcon />
					<p>{item.diff}</p>
				</div>
				<div className='flex items-center gap-2 text-zinc-400'>
					<CodeIcon />
					<p>{item.duration}</p>
				</div>
			</div>
		</div>
	)
}

export default TabItem
