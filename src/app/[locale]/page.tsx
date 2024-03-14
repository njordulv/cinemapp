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
    <main className="flex flex-col items-center place-content-center min-h-96">
      <Movies />
    </main>
  )
}
