import Logo from '../header/Logo'
import { Separator } from '../ui/separator'
import Credits from './Credits'
import FooterCol1 from './FooterCol1'
import FooterCol2 from './FooterCol2'
import FooterCol3 from './FooterCol3'
import FooterCol4 from './FooterCol4'
import FooterCol5 from './FooterCol5'
import FooterCol6 from './FooterCol6'

const Footer = () => {
	return (
		<div className='bg-secondary px-4 py-12'>
			<div className='mx-auto max-w-6xl'>
				<Logo showSearch={false} />
				<div className='mt-4 flex justify-between'>
					<div className='flex flex-wrap gap-2 gap-x-8 lg:justify-between lg:gap-x-16'>
						<FooterCol1 />
						<FooterCol2 />
						<FooterCol3 />
					</div>
					<div className='flex flex-wrap gap-2 gap-x-8 lg:justify-between lg:gap-x-16'>
						<Separator
							orientation='vertical'
							className='mx-4 hidden h-[36rem] w-px border-none bg-zinc-800 dark:bg-zinc-600 lg:inline-block'
						/>
						<FooterCol4 />
						<FooterCol5 />
						<FooterCol6 />
					</div>
				</div>
				<Separator className='my-8 hidden w-full border-none bg-zinc-800 dark:bg-zinc-600 lg:inline-block' />
				<Credits />
			</div>
		</div>
	)
}

export default Footer
