'use client'

import { TypeAnimation } from 'react-type-animation'

const JSSection = () => {
	return (
		<section className='grid min-h-[50vh] grid-cols-1 md:grid-cols-2'>
			<div className='flex h-full min-h-[calc(50vh-3.5rem)] items-center justify-center bg-[#f5dd1b]'>
				<h3 className='text-center text-5xl font-bold text-white'>
					Program JavaScript
				</h3>
			</div>
			<div className='flex h-[50vh] items-center bg-zinc-900 p-6 md:p-12'>
				<TypeAnimation
					sequence={[
						'<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8" />\n\t<title>Document</title>\n</head>\n<body>\n\t<h1>Hello World!</h1>\n\t<p>Lorem Ipsum</p>\n</body>\n</html>',
					]}
					className='whitespace-pre font-mono text-green-400 drop-shadow'
				/>
			</div>
		</section>
	)
}

export default JSSection
