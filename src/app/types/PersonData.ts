interface PersonData {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  known_for: KnownFor[]
  place_of_birth: string
  biography: string
  birthday: string
  deathday: null
  homepage: string
  imdb_id: string
}

interface KnownFor {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export default PersonData
