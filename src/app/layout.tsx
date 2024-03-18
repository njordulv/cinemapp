import { ReactNode } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import UIProvider from '@/providers/UIProvider'
import Navigation from './components/Common/Navigation'
import './globals.css'

const slabo = Roboto_Condensed({
  weight: ['100', '300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: ReactNode
}

export default async function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${slabo.className} bg-background`}>
        <UIProvider>
          <Navigation />
          {children}
        </UIProvider>
      </body>
    </html>
  )
}
