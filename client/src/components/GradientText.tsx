const GradientText = ({ text }: { text: string }) => {
	return (
		<span className='bg-gradient-to-r from-cyan-500 to-primary bg-clip-text text-transparent'>
			{text}
		</span>
	)
}

export default GradientText
