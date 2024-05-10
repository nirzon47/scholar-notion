import Image from 'next/image'

const Loading = () => {
	return (
		<div className='flex justify-center'>
			<Image src={'/loader.svg'} alt='loader' width={50} height={50} />
		</div>
	)
}

export default Loading
