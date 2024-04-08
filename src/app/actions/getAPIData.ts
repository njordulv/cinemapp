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
  category: string
): Promise<T[]> => {
  try {
    const url = `${BASE_URL}/${type}/${category}?api_key=${API_KEY}&page=${page}`
    const response = await fetch(url)
    const data = (await response.json()) as APIResponse<T>
    return data.results as T[]
  } catch (error: unknown) {
    throw new Error(`An error happened: ${error}`)
  }
}
