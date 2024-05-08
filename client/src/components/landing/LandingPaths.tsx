import GradientText from '../GradientText'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import FreeTabs from './tabs/FreeTabs'
import BeginnerTabs from './tabs/BeginnerTabs'
import PopularTabs from './tabs/PopularTabs'
import PathsTabs from './tabs/PathsTab'

const LandingPaths = () => {
	return (
		<div className='relative grid h-[calc(100vh-3.5rem)] place-content-center'>
			<Image
				src={'/waves.svg'}
				alt='waves'
				width={1000}
				height={250}
				quality={100}
				className='absolute bottom-0 -z-10 h-full w-full object-cover'
			/>
			<div className='mx-auto max-w-5xl px-2'>
				<h2 className='text-center text-2xl font-bold md:text-3xl'>
					Unlock the <GradientText text={'Power of Code'} />
				</h2>
				<p className='mb-6 mt-3 text-center text-sm font-light tracking-wider text-zinc-400 md:text-base'>
					Learn to build anything you can imagine
				</p>
				<Tabs
					defaultValue='free'
					className='flex flex-col items-center justify-center'
				>
					<TabsList className='mb-6'>
						<TabsTrigger value='free'>Free</TabsTrigger>
						<TabsTrigger value='beginner'>Beginner</TabsTrigger>
						<TabsTrigger value='popular'>Popular</TabsTrigger>
						<TabsTrigger value='paths'>Paths</TabsTrigger>
					</TabsList>
					<FreeTabs />
					<BeginnerTabs />
					<PopularTabs />
					<PathsTabs />
				</Tabs>
			</div>
		</div>
	)
}

export default LandingPaths
