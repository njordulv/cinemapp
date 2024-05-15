import { Metadata } from 'next'
import AllVideos from '@/components/Video/AllVideos'
import type { ParamsWithId } from '@/types/params'

export const metadata: Metadata = {
  title: 'Videos - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default function Page({ params }: { params: ParamsWithId }) {
  const contentType = params.id.includes('/movie/') ? 'movie' : 'tv'
  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10">
      <AllVideos params={params} contentType={contentType} />
    </main>
  )
}
