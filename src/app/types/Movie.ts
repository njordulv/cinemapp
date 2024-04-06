export interface Movie {
  id: number
  title: string
  name: string
  overview: string
  release_date: string
  first_air_date: string
  poster_path?: string
  image?: string
  vote_average?: number
  type: string
}

export interface Dates {
  maximum: string
  minimum: string
}

export interface MovieAPIResponse {
  dates: Dates[]
  page: number
  type: string
  limit: 20
  total_pages: number
  total_results: number
  results: Movie[]
}
