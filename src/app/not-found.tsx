'use client'

import { Roboto_Condensed } from 'next/font/google'
import Page404 from '@/src/app/404'

const slabo = Roboto_Condensed({
  weight: ['100', '300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export default function NotFound() {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${slabo.className}`}>
        <Page404 />
      </body>
    </html>
  )
}
