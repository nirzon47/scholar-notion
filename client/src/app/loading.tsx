import Image from 'next/image'

const Loading = () => {
	return (
		<div className='grid h-[calc(100vh-3.5rem)] w-screen place-content-center'>
			<Image
				src={'/loader.svg'}
				alt='Loading...'
				width={128}
				height={128}
				quality={100}
			/>
		</div>
	)
}

export default Loading
