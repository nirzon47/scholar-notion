import GradientText from '@/components/GradientText'
import AboutContact from '@/components/about/AboutContact'
import AboutFounding from '@/components/about/AboutFounding'
import AboutLanding from '@/components/about/AboutLanding'
import Image from 'next/image'

const About = () => {
	return (
		<div className='min-h-[calc(100vh-3.5rem)]'>
			<AboutLanding />
			<AboutFounding />
			<AboutContact />
		</div>
	)
}

export default About
