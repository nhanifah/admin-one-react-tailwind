import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = {
  children: ReactNode
}

export default function LayoutGuest({ children }: Props) {
  return (
    <SessionProvider>
      <div className="bg-gray-50 dark:bg-slate-800 dark:text-slate-100">{children}</div>
    </SessionProvider>
  )
}
