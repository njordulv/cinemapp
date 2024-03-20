import Single from '@/components/Movie/Single'

export default function page({ params }: { params: { id: string } }) {
  return <Single params={params} />
}
