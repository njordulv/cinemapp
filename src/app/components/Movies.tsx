'use client'

import { useState, useEffect } from 'react'
import { Pagination } from '@nextui-org/react'
import MovieCard from '@/components/UI/MovieCard'
import MovieData from '@/types/movieData'
import MovieSkeleton from '@/components/UI/MovieSkeleton'
import { CustomButton } from '@/components/UI/CustomButton'

export default function Movies() {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
  const [movies, setMovies] = useState<MovieData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  useEffect(() => {
    fetch(`/api/popular?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [currentPage])

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  const color = 'black'

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
          movies.map((movie) => (
            <MovieCard
              {...movie}
              image={`${BASE_IMAGE_URL}${movie.poster_path}`}
              key={movie.id}
            />
          ))
        )}
      </div>
      <div className="mb-32 flex text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:text-left items-center justify-center gap-4 my-8">
        <CustomButton color="blue" onClick={prevPage}>
          Prev
        </CustomButton>
        <Pagination
          showShadow
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
          classNames={{
            base: 'px-0',
            wrapper: 'gap-1 overflow-visible h-8 rounded border border-divider',
            item: 'w-9 h-9 text-small bg-blueDark rounded-lg',
            cursor: 'bg-blue text-white font-bold shadow-none rounded-lg',
          }}
        />
        <CustomButton color="blue" onClick={nextPage}>
          Next
        </CustomButton>
      </div>
    </>
  )
}
