import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from '@/components/ui/toaster'
import { Provider } from 'jotai'
import Header from '@/components/header/Header'
import './globals.css'
import Footer from '@/components/footer/Footer'

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
		<html
			lang='en'
			className={`${GeistSans.variable} ${GeistMono.variable} dark`}
		>
			<body className='font-sans'>
				<Provider>
					<div className='relative flex min-h-screen w-screen flex-col '>
						<Header />
						{children}
					</div>
					<Footer />
				</Provider>
				<Toaster />
			</body>
		</html>
	)
}
