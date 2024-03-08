import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { Slabo_27px } from 'next/font/google'
import { locales } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import NextIntlProvider from '@/providers/NextIntlProvider'
import UIProvider from '@/providers/UIProvider'

const slabo = Slabo_27px({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  let messages
  try {
    messages = (await import(`@/locales/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={slabo.className}>
        <UIProvider>
          <NextIntlProvider
            locale={locale}
            messages={messages}
            timeZone="Europe/Berlin"
            now={new Date()}
          >
            {children}
          </NextIntlProvider>
        </UIProvider>
      </body>
    </html>
  )
}
