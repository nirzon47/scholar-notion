'use client'
import { TypeAnimation } from 'react-type-animation'

const CSSSection = () => {
	return (
		<section className='grid min-h-[50vh] grid-cols-1 md:grid-cols-2'>
			<div className='flex h-[50vh] items-center bg-zinc-900 p-6 md:order-first md:p-12'>
				<TypeAnimation
					sequence={[
						'button {\n\toutline: none;\n\tborder: none;\n\tbackground-color: blue;\n\tcolor: white;\n\tpadding: 0.5rem 1rem;\n\tborder-radius: 0.25rem;\n}',
						1000,
					]}
					className='whitespace-pre font-mono text-green-400 drop-shadow'
				/>
			</div>
			<div className='order-first flex h-full min-h-[calc(50vh-3.5rem)] items-center justify-center bg-[#244ce2] md:order-none'>
				<h3 className='text-center text-5xl font-bold text-white'>
					Design CSS
				</h3>
			</div>
		</section>
	)
}

export default CSSSection
