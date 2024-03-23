import SingleSeason from '@/components/TV/SingleSeason'

interface Props {
  params: { id: string; sId: number }
}

export default function Page({ params }: Props) {
  return <SingleSeason params={params} />
}
