import { ReactNode } from 'react'
import { Roboto_Condensed } from 'next/font/google'
import UIProvider from '@/providers/UIProvider'
import StoreProvider from '@/providers/StoreProvider'
import Navigation from '@/components/Common/Navigation'
import TermsOfUse from '@/components/UI/TermsOfUse'
import './globals.css'

const roboto = Roboto_Condensed({
  weight: ['100', '300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: ReactNode
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
          </StoreProvider>
        </UIProvider>
      </body>
    </html>
  )
}
