'use client'

import { useState } from 'react'
import { Movie } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import SkeletonBox from '@/components/UI/SkeletonBox'
import CardBox from '@/components/Movie/CardBox'
import Paginate from '@/components/UI/Paginate'
import Error from '@/components/UI/Error'

export default function Layout() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/popular&page=${currentPage}`,
  })
  const NO_IMAGE = '/no-image.svg'

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
          data.results.map((movie: Movie) => (
            <CardBox
              {...movie}
              image={movie.poster_path ? `${movie.poster_path}` : NO_IMAGE}
              key={movie.id}
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
