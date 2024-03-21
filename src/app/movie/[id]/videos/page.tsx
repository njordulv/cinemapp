import AllVideos from '@/components/Video/AllVideos'

interface AllVideosProps {
  params: { id: string }
  contentType: string
}

export default function Page({ params }: AllVideosProps) {
  return <AllVideos params={params} contentType={'movie'} />
}
