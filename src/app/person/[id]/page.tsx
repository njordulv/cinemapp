import type { Metadata } from 'next'
import { getMetadata } from '@/utils/getMetadata'
import Single from '@/components/Person/Single'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getMetadata(`person/${params.id}`, {})
}

export default function page({ params }: { params: { id: string } }) {
  return <Single params={params} />
}
