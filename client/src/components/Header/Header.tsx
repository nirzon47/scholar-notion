'use client'

import { useLayoutEffect, useState } from 'react'
import AuthSection from './AuthSection'
import Logo from './Logo'
import NavigationLinks from './NavigationLinks'

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
      <div className='sticky top-0 h-14 bg-slate-900'>
         <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-4'>
            <Logo showSearch={showSearch} />
            {!isMobile ? <NavigationLinks /> : null}
            <AuthSection
               showSearch={showSearch}
               setShowSearch={setShowSearch}
            />
         </div>
      </div>
   )
}

export default Header
