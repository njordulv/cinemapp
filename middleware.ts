import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localeDetection, localePrefix } from '@/config'

export default createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames,
  localeDetection,
  localePrefix,
})

export const config = {
  matcher: ['/', '/(de|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
