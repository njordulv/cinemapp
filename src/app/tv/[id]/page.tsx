import Single from '@/components/TV/Single'

export default function page({ params }: { params: { id: string } }) {
  return <Single params={params} />
}
