'use client'

import { useState, useEffect } from 'react'
import TVCard from '@/components/UI/TVCard'
import TVData from '@/types/TVData'
import MovieSkeleton from '@/components/UI/MovieSkeleton'
import MoviePagination from '@/components/UI/MoviePagination'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const NO_IMAGE = '/no-image.svg'

export default function TVShows() {
  const [tvShow, setTVShows] = useState<TVData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`/api/tv?page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => setTVShows(data.results))
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
              <MovieSkeleton key={index} />
            ))}
          </>
        ) : (
          tvShow.map((tv) => (
            <TVCard
              {...tv}
              image={
                tv.poster_path ? `${BASE_IMAGE_URL}${tv.poster_path}` : NO_IMAGE
              }
              key={tv.id}
            />
          ))
        )}
      </div>
      <MoviePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}
