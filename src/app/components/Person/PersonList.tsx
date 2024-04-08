'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { getAPIData } from '@/actions/getAPIData'
import { Person } from '@/types/data'
import PersonCard from '@/components/Person/PersonCard'

type PersonListProps = {
  initialPersons: Person[]
  type: string
  category: string
  heading: string
}

const NUMB_OF_PERSONS_TO_FETCH = 20

export default function PersonList({
  initialPersons,
  type,
  category,
  heading,
}: PersonListProps) {
  const [offset, setOffset] = useState(NUMB_OF_PERSONS_TO_FETCH)
  const [persons, setPersons] = useState<Person[]>(initialPersons)

  const loadMore = async () => {
    try {
      const apiPersons = await getAPIData<Person>(offset, type, category)
      setPersons([...persons, ...apiPersons])
      setOffset(offset + NUMB_OF_PERSONS_TO_FETCH)
    } catch (e) {
      console.error('Error fetching data:', e)
    }
  }

  return (
    <>
      <h1 className="flex self-start font-medium text-4xl">{heading}</h1>
      <div className="grid lg:max-w-[1170px] w-full lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center mb-0">
        {persons?.length > 0 &&
          persons.map((person: Person) => (
            <PersonCard
              key={person.id}
              person={person}
              type={type}
              category={category}
            />
          ))}
      </div>
      <div className="flex items-center justify-center">
        <Button size="lg" onClick={loadMore} variant="ghost">
          Load more
        </Button>
      </div>
    </>
  )
}
