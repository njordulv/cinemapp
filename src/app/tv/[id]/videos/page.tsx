import AllVideosTV from '@/components/Video/AllVideosTV'

interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
  return <AllVideosTV params={params} />
}
