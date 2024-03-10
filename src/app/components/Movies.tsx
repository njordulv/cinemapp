'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/UI/MovieCard'
import MovieSkeleton from '@/components/UI/MovieSkeleton'

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path?: string
  image?: string
  vote_average?: number
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('/api/popular')
      const data = await res.json()
      setMovies(data.results)
      setLoading(false)
    }
    fetchMovies()
  }, [])

  return (
    <>
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
