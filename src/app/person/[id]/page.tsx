import Single from '@/components/Person/Single'

export default function page({ params }: { params: { id: string } }) {
  return <Single params={params} />
}
