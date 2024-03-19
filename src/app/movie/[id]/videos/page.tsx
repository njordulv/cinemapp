import AllVideos from '@/components/Video/AllVideos'

export default function Page({ params }: { params: { id: string } }) {
  return <AllVideos params={params} />
}
