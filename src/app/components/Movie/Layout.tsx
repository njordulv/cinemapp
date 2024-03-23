'use client'

import { useState, useEffect } from 'react'
import MovieData from '@/types/movieData'
import SkeletonBox from '@/components/UI/SkeletonBox'
import CardBox from '@/components/Movie/CardBox'
import Paginate from '@/components/UI/Paginate'

const NO_IMAGE = '/no-image.svg'

export default function Layout() {
  const [movies, setMovies] = useState<MovieData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`/api/movies?endpoint=movie/popular&page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => setMovies(data.results))
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
          movies.map((movie) => (
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
