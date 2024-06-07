import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import UIProvider from '@/providers/UIProvider'
import StoreProvider from '@/providers/StoreProvider'
import Navigation from '@/components/Common/Navigation'
import TermsOfUse from '@/components/UI/TermsOfUse'
import Footer from '@/components/Common/Footer'
import './globals.css'

const roboto = Roboto_Condensed({
  weight: ['100', '300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function Layout({ children }: Props) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${roboto.className}`}>
        <UIProvider>
          <StoreProvider>
            <Navigation>
              {children}
              <TermsOfUse />
            </Navigation>
            <Footer />
          </StoreProvider>
        </UIProvider>
      </body>
    </html>
  )
}
