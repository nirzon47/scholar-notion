'use client'

import { useLayoutEffect, useState } from 'react'
import AuthSection from './AuthSection'
import Logo from './Logo'
import NavigationLinks from './NavigationLinks'
import MobileNav from './MobileNav'

const Header = () => {
	const [showSearch, setShowSearch] = useState<boolean>(false)
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useLayoutEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className='sticky top-0 h-14 bg-secondary'>
			<div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4'>
				<div className='flex items-center gap-4'>
					{isMobile && <MobileNav />}
					<Logo showSearch={showSearch} />
				</div>
				{!isMobile && <NavigationLinks />}
				<AuthSection
					showSearch={showSearch}
					setShowSearch={setShowSearch}
				/>
			</div>
		</div>
	)
}

export default Header
