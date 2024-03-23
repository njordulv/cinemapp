import AllVideos from '@/components/Video/AllVideos'
import type { ParamsWithId } from '@/types/params'

export default function Page({ params }: { params: ParamsWithId }) {
  const contentType = params.id.includes('/movie/') ? 'movie' : 'tv'
  return <AllVideos params={params} contentType={contentType} />
}
