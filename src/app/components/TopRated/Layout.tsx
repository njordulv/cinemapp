'use client'

import { useState } from 'react'
import { TopRated } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import SkeletonBox from '@/components/UI/SkeletonBox'
import CardBox from '@/components/TopRated/CardBox'
import Paginate from '@/components/UI/Paginate'
import Error from '@/components/UI/Error'

interface TopRatedProps {
  type: 'tv' | 'movie'
}

export default function Layout({ type }: TopRatedProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=${type}/top_rated&page=${currentPage}`,
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
          data.results.map((topRated: TopRated) => (
            <CardBox
              {...topRated}
              type={type}
              image={
                topRated.poster_path ? `${topRated.poster_path}` : NO_IMAGE
              }
              key={topRated.id}
            />
          ))
        )}
      </div>
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={462}
      />
    </>
  )
}
