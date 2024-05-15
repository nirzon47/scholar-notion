import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from '@/components/ui/toaster'
import { Provider } from 'jotai'
import { ThemeProvider } from '@/components/theme-provider'
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
			className={`${GeistSans.variable} ${GeistMono.variable}`}
			suppressHydrationWarning
		>
			<body className='overflow-x-hidden font-sans'>
				<ThemeProvider defaultTheme='system' attribute='class'>
					<Provider>
						<div className='relative flex min-h-screen w-screen flex-col '>
							<Header />
							{children}
						</div>
						<Footer />
					</Provider>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
