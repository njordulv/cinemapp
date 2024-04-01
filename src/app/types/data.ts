export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface HeroTypes {
  id: number
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
  directed_by?: CrewTypes[]
}

export interface GuestStars {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

export interface Episodes {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: '601'
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: CrewTypes[]
  guest_stars: GuestStars[]
}

export interface CastTypes {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewTypes {
  adult?: boolean
  gender?: number
  id?: number
  known_for_department?: string
  name?: string
  original_name?: string
  popularity?: number
  profile_path?: string
  credit_id?: number
  department?: string
  job?: string
}

export interface Credits {
  cast: CastTypes[]
  crew: CrewTypes[]
}

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

export interface Known {
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

export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  known_for: Known[]
  place_of_birth: string
  biography: string
  birthday: string
  deathday: null
  homepage: string
  imdb_id: string
}

export interface Seasons {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface Collection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface Single {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: Collection
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  first_air_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: Credits
  cast: CastTypes[]
  crew: CrewTypes[]
}

export interface TopRated {
  id: number
  type: string
  title: string
  name?: string
  overview: string
  release_date: string
  first_air_date?: string
  poster_path?: string
  image?: string
  vote_average?: number
}

export interface VideoTypes {
  movieId: number | string
  iso_639_1?: string
  iso_3166_1?: string
  name?: string
  key?: string
  site?: string
  size?: number
  type?: string
  official?: boolean
  published_at?: string
  id?: string
  iframe?: string
  isMovie: boolean
}

export interface ItemsList {
  id?: number
  name?: string
  english_name?: string
}

export interface CardTypes {
  id: number | string
  type: string
  image: string | undefined
  profile_path?: string | undefined
  title?: string
  name?: string
  date?: string
  dateAir?: string
  vote_average?: number | undefined
  seasonNumber?: number
  known_for?: Known[]
}

export interface Human {
  birthdayType: string
  deathdayType?: string | null
}

export interface SearchTypes {
  id: number
  backdrop_path: string
  poster_path: string
  profile_path?: string
  title?: string
  name?: string
  media_type: string
  genre_ids: number[]
  release_date?: string
  first_air_date?: string
  known_for_department?: string
}

export interface NetworkTypes {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ContentRatingsTypes {
  iso_3166_1: string
  rating: string
}

export interface ReleaseDatesTypes {
  certification: string
  iso_639_1: string
  note: string
  release_date: string
}

export interface CertificationTypes {
  iso_3166_1: string
  release_dates: ReleaseDatesTypes[]
}

export interface PersonMoviesTypes {
  backdrop_path: boolean
  genre_ids: Genre[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  first_air_date: string
  title: string
  name: string
  video: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order: number
  media_type: string
}

export interface RecommendationsTypes {
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
  first_air_date?: string
  video: boolean
  vote_average: number
  vote_count: number
}
