'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/UI/MovieCard'
import MovieSkeleton from '@/components/UI/MovieSkeleton'
import MovieData from '@/types/movieData'

export default function Movies() {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
  const [movies, setMovies] = useState<MovieData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/popular')
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {error && <h1 className="heading">This is an error - {error}</h1>}
      {loading ? (
        <>
          {[...Array(20)].map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {movies.map((movie) => (
            <MovieCard
              {...movie}
              image={`${BASE_IMAGE_URL}${movie.poster_path}`}
              key={movie.id}
            />
          ))}
        </>
      )}
    </>
  )
}
