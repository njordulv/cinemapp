import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import Movies from '@/components/Movies'

type Props = {
  params: { locale: string }
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Home')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Movies />
    </main>
  )
}
