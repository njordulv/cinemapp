import { Metadata } from 'next'
import AllSeasons from '@/components/TV/AllSeasons'

interface Props {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'Seasons - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default function Page({ params }: Props) {
  return <AllSeasons params={params} />
}
