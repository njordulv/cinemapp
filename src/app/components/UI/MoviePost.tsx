'use client'

import { useSelector } from '@/redux/store'
import { selectMovie } from '@/redux/slices/movieSlice'
import { Image } from '@nextui-org/react'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import Cast from './Cast'
import { formatReleaseDateAlt, formatReleaseYear } from '@/utils/formatDate'
import { convertMinToHrs } from '@/utils/formatRuntime'
import styles from '@/styles/singleMovie.module.scss'

const MoviePost = () => {
  const movie = useSelector(selectMovie)
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
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
      <div className={styles.singleHero}>
        <div
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${BASE_IMAGE_URL}original/${movie.backdrop_path})`
              : `url(${NO_IMAGE})`,
          }}
          className={styles.singleHero_back}
        ></div>
        <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto py-20">
          <div
            className={`grid lg:grid-cols-[1fr_3fr] gap-10 items-center ${styles.singleHero_wrapper}`}
          >
            <Image
              shadow="md"
              className="object-cover"
              src={
                movie.poster_path
                  ? `${BASE_IMAGE_URL}w300/${movie.poster_path}`
                  : NO_IMAGE
              }
              width={300}
              height={450}
              fallbackSrc={NO_IMAGE}
              alt={movie.title}
            />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="flex mb-0 gap-2 text-shadow-sm">
                  {movie.title}
                  <span className="font-thin opacity-80">
                    ({formatReleaseYear(movie.release_date)})
                  </span>
                </h1>
                <div className={styles.singleHero_info}>
                  <div className="uppercase">
                    {formatReleaseDateAlt(movie.release_date)}
                  </div>
                  <ul className={styles.singleHero_list}>
                    {renderList(movie.genres)}
                  </ul>
                  <div>{convertMinToHrs(movie.runtime)}</div>
                </div>
              </div>
              <div className={styles.singleHero_average}>
                {movie.vote_average ? (
                  <VoteAverage
                    vote={movie.vote_average}
                    card="w-[63px] h-[63px]"
                    size="w-14 h-14 drop-shadow-md"
                    strokeWidth={2}
                    text="text-[19px]"
                  />
                ) : (
                  <VoteDisabled
                    card="w-[63px] h-[63px]"
                    size="w-14 h-14 drop-shadow-md"
                    strokeWidth={2}
                    text="text-[19px] top-[3px] relative"
                  />
                )}
                User Score
              </div>
              {movie.tagline && (
                <div className="italic font-thin text-[18px] text-shadow-sm opacity-80">
                  {movie.tagline}
                </div>
              )}
              {movie.overview && (
                <div className="text-shadow-sm">
                  <h3 className="mb-1">Overview:</h3>
                  <p>{movie.overview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Cast />
      <p>Rating: {movie.vote_average}</p>
      <p>Vote Count: {movie.vote_count}</p>
      <p>Adult: {movie.adult ? 'Yes' : 'No'}</p>
      <p>Original Language: {movie.original_language}</p>
      <p>Original Title: {movie.original_title}</p>
      <p>Popularity: {movie.popularity}</p>
      <p>Budget: {movie.budget}</p>
      <p>Revenue: {movie.revenue}</p>
      <p>Status: {movie.status}</p>

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
