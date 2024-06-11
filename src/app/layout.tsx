import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
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
  metadataBase: new URL('https://cinemapp-movie.vercel.app'),
  openGraph: {
    title: 'Cinemapp',
    description: 'An Application for Movie Enthusiasts',
    url: 'https://cinemapp-movie.vercel.app',
    siteName: 'Cinemapp',
    images: [
      {
        url: 'https://cinemapp-movie.vercel.app/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image Alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
            <Analytics />
          </StoreProvider>
        </UIProvider>
      </body>
    </html>
  )
}
