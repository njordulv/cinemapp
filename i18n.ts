import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from '@/config'

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (
      await (locale === 'en'
        ? import('./locales/en.json')
        : import(`./locales/${locale}.json`))
    ).default,
  }
})
