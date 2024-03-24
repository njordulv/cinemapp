'use client'

import { useState } from 'react'
import useFetcher from '@/hooks/useFetcher'
import { CardTypes } from '@/types/data'
import SkeletonBox from '@/components/Person/SkeletonBox'
import CardBox from '@/components/Person/CardBox'
import Paginate from '@/components/UI/Paginate'
import Error from '@/components/UI/Error'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300'
const NO_IMAGE = '/no-image.svg'

export default function Layout() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=person/popular&page=${currentPage}`,
  })
  if (isError) return <Error errorText={isError.message} />

  return (
    <>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left gap-4">
        {isLoading ? (
          <>
            {[...Array(20)].map((_, index) => (
              <SkeletonBox key={index} />
            ))}
          </>
        ) : (
          data.results.map((person: CardTypes) => (
            <CardBox
              {...person}
              image={
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
