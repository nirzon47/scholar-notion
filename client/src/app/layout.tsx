import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
	title: 'ScholarNation',
	description: 'EdTech to power your dreams',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={`${GeistSans.variable} dark`}>
			<body className='font-sans'>{children}</body>
		</html>
	)
}
