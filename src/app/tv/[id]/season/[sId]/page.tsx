import { Metadata } from 'next'
import SingleSeason from '@/components/TV/SingleSeason'

interface Props {
  params: { id: string; sId: number }
}

export const metadata: Metadata = {
  title: `CinemApp`,
  description: 'An Application for Movie Enthusiasts',
}

export default function Page({ params }: Props) {
  return (
    <main className="flex flex-col items-center place-content-center w-full max-w-[1170px] m-auto px-4 py-10">
      <SingleSeason params={params} />
    </main>
  )
}
