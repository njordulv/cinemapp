'use client'

import { useState } from 'react'
import { Movie } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import SkeletonBox from '@/components/UI/SkeletonBox'
import MainCard from '@/components/UI/MainCard'
import Paginate from '@/components/UI/Paginate'
import Error from '@/components/UI/Error'

interface PageProps {
  type: 'tv' | 'movie'
  end: '/popular' | '/top_rated' | '/airing_today' | ''
}

export default function MainLayout({ type, end }: PageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=${type}${end}&page=${currentPage}`,
  })
  const NO_IMAGE = '/no-image.svg'
  const resultsPerPage = 20
  const totalResults = data?.total_results ?? 0
  const totalPages = Math.ceil(totalResults / resultsPerPage)

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
        ) : data && data.results ? (
          data.results.map((movie: Movie) => (
            <MainCard
              id={movie.id}
              image={movie.poster_path ? `${movie.poster_path}` : NO_IMAGE}
              name={movie.title}
              date={movie.release_date}
              vote_average={movie.vote_average}
              type={type}
            />
          ))
        ) : null}
      </div>
      {data && data.results && (
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={type === 'movie' && end === '/popular' ? 500 : totalPages}
        />
      )}
    </>
  )
}
