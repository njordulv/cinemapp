import AllVideos from '@/components/Video/AllVideos'

export default function Page({
  params,
}: {
  params: { id: string }
  contentType: { type: string }
}) {
  return <AllVideos params={params} contentType={{ type: 'tv' }} />
}
