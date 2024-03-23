interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

interface HeroData {
  title?: string
  name?: string
  backdrop_path: string
  poster_path: string
  release_date?: string
  budget: number
  revenue: number
  tagline: string
  overview: string
  genres: []
  vote_average: number
  homepage: string
  imdb_id: string
  runtime?: number
  first_air_date?: string
  isMovie: boolean
  created_by?: CreatedBy[]
}

export default HeroData