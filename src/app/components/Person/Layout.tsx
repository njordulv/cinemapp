'use client'

import { useState, useEffect } from 'react'
import PersonData from '@/types/PersonData'
import SkeletonBox from '@/components/Person/SkeletonBox'
import CardBox from '@/components/Person/CardBox'
import Paginate from '@/components/UI/Paginate'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const NO_IMAGE = '/no-image.svg'

export default function Layout() {
  const [persons, setPersons] = useState<PersonData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`/api/person/popular?page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => setPersons(data.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [currentPage])

  return (
    <>
      {error && <h1 className="heading">This is an error - {error}</h1>}
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left gap-4">
        {loading ? (
          <>
            {[...Array(20)].map((_, index) => (
              <SkeletonBox key={index} />
            ))}
          </>
        ) : (
          persons.map((person) => (
            <CardBox
              {...person}
              profile_path={
                person.profile_path
                  ? `${BASE_IMAGE_URL}${person.profile_path}`
                  : NO_IMAGE
              }
              key={person.id}
            />
          ))
        )}
      </div>
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={500}
      />
    </>
  )
}
