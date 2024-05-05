import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Header from '@/components/Header/Header'

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
      <body className='relative min-h-screen w-screen font-sans'>
        <Header />
        {children}
      </body>
    </html>
  )
}
