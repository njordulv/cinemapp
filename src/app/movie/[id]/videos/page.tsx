import { Metadata } from 'next'
import AllVideos from '@/components/Video/AllVideos'
import type { ParamsWithId } from '@/types/params'

export const metadata: Metadata = {
  title: 'Videos - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default function Page({ params }: { params: ParamsWithId }) {
  const contentType = params.id.includes('/tv/') ? 'tv' : 'movie'
  return <AllVideos params={params} contentType={contentType} />
}
