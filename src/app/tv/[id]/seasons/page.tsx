import AllSeasons from '@/components/TV/AllSeasons'

interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
  return <AllSeasons params={params} />
}
