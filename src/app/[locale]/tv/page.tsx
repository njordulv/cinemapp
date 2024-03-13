import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import TVShows from '@/components/TVShows'

type Props = {
  params: { locale: string }
}

export default function TVShowsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Home')

  return (
    <main className="flex flex-col items-center place-content-center min-h-96">
      <TVShows />
    </main>
  )
}
