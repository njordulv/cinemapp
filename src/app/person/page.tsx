import { Metadata } from 'next'
import { getAPIData } from '@/utils/getAPIData'
import { Person } from '@/types/data'
import PersonList from '@/components/Person/PersonList'

export const metadata: Metadata = {
  title: 'Popular People - CinemApp',
  description: 'An Application for Movie Enthusiasts',
}

export default async function Page() {
  const page = 1
  const type = 'person'
  const category = 'popular'
  const heading = 'Popular People'
  const initialPersons = await getAPIData<Person>(page, type, category)

  return (
    <main className="flex flex-col items-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <PersonList
        initialPersons={initialPersons}
        type={type}
        category={category}
        heading={heading}
      />
    </main>
  )
}
