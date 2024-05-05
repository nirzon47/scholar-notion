'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = ({ showSearch }: { showSearch: boolean }) => {
  const router = useRouter()

  return (
    <h2
      className={clsx(
        'flex cursor-pointer items-center gap-2',
        showSearch && 'hidden',
      )}
      onClick={() => router.push('/')}
    >
      <Image src='/logo.png' alt='ScholarNation' width={36} height={36} />
      <span className='hidden text-lg font-semibold text-white md:inline'>
        ScholarNation
      </span>
    </h2>
  )
}

export default Logo
