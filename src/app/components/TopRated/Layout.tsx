'use client'

import { useState, useEffect } from 'react'
import TopRatedData from '@/types/TopRatedData'
import SkeletonBox from '@/components/UI/SkeletonBox'
import CardBox from '@/components/TopRated/CardBox'
import Paginate from '@/components/UI/Paginate'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const NO_IMAGE = '/no-image.svg'

export default function Layout() {
  const [topRated, setTopRated] = useState<TopRatedData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`/api/top_rated?page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => setTopRated(data.results))
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
          topRated.map((topRated) => (
            <CardBox
              {...topRated}
              image={
                topRated.poster_path
                  ? `${BASE_IMAGE_URL}${topRated.poster_path}`
                  : NO_IMAGE
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
