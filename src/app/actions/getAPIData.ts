'use server'

import {
  Person,
  PersonAPIResponse,
  Movie,
  MovieAPIResponse,
} from '@/types/data'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type APIResponse<T> = T extends Person ? PersonAPIResponse : MovieAPIResponse

export const getAPIData = async <T extends Person | Movie>(
  page: number,
  type: string,
  category: 'popular' | 'top_rated' | 'trending',
  timeWindow: 'day' | 'week' = 'day'
): Promise<T[]> => {
  try {
    let url
    if (category === 'trending') {
      url = `${BASE_URL}/trending/${type}/${timeWindow}?api_key=${API_KEY}&page=${page}`
    } else {
      url = `${BASE_URL}/${type}/${category}?api_key=${API_KEY}&page=${page}`
    }

    const response = await fetch(url)
    const data = (await response.json()) as APIResponse<T>
    return data.results as T[]
  } catch (error: unknown) {
    throw new Error(`An error happened: ${error}`)
  }
}
