'use server'

import { Movie, MovieAPIResponse } from '@/types/Movie'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getMovies = async (
  page: number,
  type: string,
  category: string
): Promise<Movie[]> => {
  try {
    const url = `${BASE_URL}/${type}/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = (await response.json()) as MovieAPIResponse
    return data.results
  } catch (error: unknown) {
    throw new Error(`An error happened: ${error}`)
  }
}
