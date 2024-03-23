import AllVideos from '@/components/Video/AllVideos'

interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
  return <AllVideos params={params} />
}
