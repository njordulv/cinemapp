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
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-4">
        <Movies />
      </div>
    </main>
  )
}
