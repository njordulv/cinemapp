'use client'

import { useSelector } from '@/redux/store'
import { selectMovie } from '@/redux/slices/movieSlice'
import SingleMovieData from '@/types/SingleMovieData'

const MoviePost = () => {
  const movie = useSelector(selectMovie)
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
  const NO_IMAGE = '/no-image.svg'

  if (!movie) {
    return <div>Loading or no movie selected...</div>
  }

  type ListItem = {
    id?: number
    name?: string
    english_name?: string
  }

  const renderList = (items: ListItem[], key: keyof ListItem = 'name') =>
    items.map((item, index) => <li key={item.id || index}>{item[key]}</li>)

  return (
    <>
      <h1>{movie.title}</h1>
      <p>ID: {movie.id}</p>
      <p>Overview: {movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Vote Count: {movie.vote_count}</p>
      <p>Adult: {movie.adult ? 'Yes' : 'No'}</p>
      <p>Original Language: {movie.original_language}</p>
      <p>Original Title: {movie.original_title}</p>
      <p>Popularity: {movie.popularity}</p>
      <p>Budget: {movie.budget}</p>
      <p>Revenue: {movie.revenue}</p>
      <p>Runtime: {movie.runtime}</p>
      <p>Status: {movie.status}</p>
      <p>Tagline: {movie.tagline}</p>
      <p>Video: {movie.video ? 'Yes' : 'No'}</p>
      <p>
        Homepage: <a href={movie.homepage}>{movie.homepage}</a>
      </p>
      <p>
        IMDb ID:{' '}
        <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>
          {movie.imdb_id}
        </a>
      </p>
      <div>
        Genres:
        <ul>{renderList(movie.genres)}</ul>
      </div>
      <div>
        Production Companies:
        <ul>{renderList(movie.production_companies)}</ul>
      </div>
      <div>
        Production Countries:
        <ul>{renderList(movie.production_countries, 'name')}</ul>
      </div>
      <div>
        Spoken Languages:
        <ul>{renderList(movie.spoken_languages, 'english_name')}</ul>
      </div>
    </>
  )
}

export default MoviePost
