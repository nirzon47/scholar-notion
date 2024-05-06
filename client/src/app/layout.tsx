import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from '@/components/ui/toaster'
import { Provider } from 'jotai'
import Header from '@/components/header/Header'
import './globals.css'

export const metadata: Metadata = {
	title: { template: '%s | ScholarNation', default: 'ScholarNation' },
	description: 'EdTech to power your dreams',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={`${GeistSans.variable} dark`}>
			<body className='relative flex min-h-screen w-screen flex-col font-sans'>
				<Provider>
					<Header />
					{children}
					<Toaster />
				</Provider>
			</body>
		</html>
	)
}
