import { unstable_setRequestLocale } from 'next-intl/server'

interface Params {
  quizSlug: string
  locale: string
}

type Props = {
  params: Params
}

export default function QuizPage({ params }: Props) {
  const { locale } = params
  unstable_setRequestLocale(locale)

  return <h1>asdsdsds</h1>
}
