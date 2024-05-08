import Logo from '../header/Logo'
import { Separator } from '../ui/separator'
import Credits from './Credits'
import FooterCol1 from './FooterCol1'
import FooterCol2 from './FooterCol2'
import FooterCol3 from './FooterCol3'

const Footer = () => {
	return (
		<div className='bg-secondary px-2 py-12'>
			<div className='mx-auto max-w-6xl'>
				<Credits />
				<Logo showSearch={false} />
				<div className='mt-4 flex justify-between'>
					<div className='flex justify-between gap-16'>
						<FooterCol1 />
						<FooterCol2 />
						<FooterCol3 />
					</div>
					<Separator
						orientation='vertical'
						className='h-96 bg-zinc-800 dark:bg-zinc-600'
					/>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default Footer
