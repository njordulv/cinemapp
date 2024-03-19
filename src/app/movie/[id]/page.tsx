'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Image,
  Chip,
  Tabs,
  Tab,
  Card,
  CardBody,
  ScrollShadow,
} from '@nextui-org/react'
import { TbWorldWww } from 'react-icons/tb'
import { LiaImdb } from 'react-icons/lia'
import { BsCurrencyDollar } from 'react-icons/bs'
import SingleMovieData from '@/types/SingleMovieData'
import Loading from '@/src/app/loading'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import Cast from '@/components/UI/Cast'
import Crew from '@/components/UI/Crew'
import MovieVideos from '@/components/Video/MovieVideos'
import { formatReleaseDateAlt, formatReleaseYear } from '@/utils/formatDate'
import { convertMinToHrs } from '@/utils/formatRuntime'
import formatBudget from '@/utils/formatBudget'
import styles from '@/styles/singleMovie.module.scss'

export default function Post({ params }: { params: { id: string } }) {
  const [movieData, setMovieData] = useState<SingleMovieData | null>(null)
  const [error, setError] = useState('')
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  useEffect(() => {
    const { id } = params

    fetch(
      `/api/movies?endpoint=movie/${id}&combinedEndpoints=movie/${id}/credits`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie data')
        }
        return response.json()
      })
      .then((data) => {
        setMovieData(data)
      })

      .catch((error) => setError(error.message))
  }, [params.id])

  type ListItem = {
    id?: number
    name?: string
    english_name?: string
  }

  const renderList = (items: ListItem[], key: keyof ListItem = 'name') =>
    items.map((item, index) => (
      <Chip size="sm" key={item.id || index}>
        {item[key]}
      </Chip>
    ))

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!movieData) {
    return <Loading />
  }

  return (
    <>
      <div className={styles.singleHero}>
        <div
          style={{
            backgroundImage: movieData.backdrop_path
              ? `url(${BASE_IMAGE_URL}original/${movieData.backdrop_path})`
              : `url(${NO_IMAGE})`,
          }}
          className={styles.singleHero_back}
        ></div>
        <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto py-20 px-6">
          <div
            className={`grid lg:grid-cols-[1fr_3fr] gap-10 items-center ${styles.singleHero_wrapper}`}
          >
            <Image
              shadow="lg"
              className="object-cover"
              src={
                movieData.poster_path
                  ? `${BASE_IMAGE_URL}w300/${movieData.poster_path}`
                  : NO_IMAGE
              }
              width={300}
              height={450}
              fallbackSrc={NO_IMAGE}
              alt={movieData.title}
            />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="flex mb-1 gap-2 text-shadow-sm">
                  {movieData.title}
                  <span className="font-thin opacity-80">
                    ({formatReleaseYear(movieData.release_date)})
                  </span>
                </h1>
                <div className={styles.singleHero_info}>
                  <div className="uppercase">
                    {formatReleaseDateAlt(movieData.release_date)}
                  </div>
                  <div className={styles.singleHero_list}>
                    {renderList(movieData.genres)}
                  </div>
                  <div>{convertMinToHrs(movieData.runtime)}</div>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <div className={styles.singleHero_average}>
                  {movieData.vote_average ? (
                    <VoteAverage
                      vote={movieData.vote_average}
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
                  <span className="text-shadow-sm">User Score</span>
                </div>
                {movieData.budget > 0 && (
                  <div className="flex flex-col">
                    <span className="text-shadow-sm font-normal">Budget:</span>
                    <span className="text-shadow-sm flex items-center">
                      <BsCurrencyDollar />
                      {formatBudget(movieData.budget)}
                    </span>
                  </div>
                )}
                {movieData.revenue > 0 && (
                  <div className="flex flex-col">
                    <span className="text-shadow-sm font-normal">Revenue:</span>
                    <div className="text-shadow-sm flex items-center">
                      <BsCurrencyDollar />
                      {formatBudget(movieData.revenue)}
                    </div>
                  </div>
                )}
              </div>
              {movieData.tagline && (
                <div className="italic font-thin text-[18px] text-shadow-sm opacity-80">
                  {movieData.tagline}
                </div>
              )}
              {movieData.overview && (
                <div className="text-shadow-sm">
                  <h3 className="mb-1">Overview:</h3>
                  <p>{movieData.overview}</p>
                </div>
              )}
              {movieData.homepage && (
                <div>
                  <Link
                    href={movieData.homepage}
                    target="
                    _blank"
                    className="inline-flex items-center gap-1 font-thin hover:text-cyan-500 text-shadow-sm"
                  >
                    <TbWorldWww size={24} /> {movieData.title}
                  </Link>
                </div>
              )}
              {movieData.imdb_id && (
                <div>
                  <Link
                    href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                    target="
                    _blank"
                    className="inline-flex items-center gap-1 font-thin hover:text-cyan-500 text-shadow-sm"
                  >
                    <LiaImdb size={24} /> IMDb
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto px-6 py-10">
        <div className="relative">
          <div className="flex w-full flex-col">
            <Tabs
              key="bordered"
              variant="bordered"
              aria-label="Options"
              classNames={{
                panel: 'px-0',
                tabList: 'border-transpLight border-1',
                cursor: '',
                tab: 'text-[17px] px-6 font-normal',
                tabContent: 'text-soft',
              }}
            >
              <Tab key="cast" title="Cast">
                <Card className="bg-blueDark">
                  <CardBody>
                    {movieData.credits.cast && (
                      <Cast cast={movieData.credits.cast} />
                    )}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="crew" title="Crew">
                <Card className="bg-blueDark">
                  <CardBody>
                    <ScrollShadow className="h-[420px]" isEnabled={false}>
                      <Crew crew={movieData.credits.crew} />
                    </ScrollShadow>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="trailers" title="Trailers">
                <Card className="bg-blueDark">
                  <CardBody>
                    <MovieVideos movieId={movieData.id} />
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="allVideos"
                title="All Videos"
                href={`/movie/${movieData.id}/videos`}
              ></Tab>
            </Tabs>
          </div>
        </div>
        <p>Rating: {movieData.vote_average}</p>
        <p>Vote Count: {movieData.vote_count}</p>
        <p>Popularity: {movieData.popularity}</p>
        <p>Status: {movieData.status}</p>
        <div>
          Production Companies:
          <div className={styles.singleHero_list}>
            {renderList(movieData.production_companies)}
          </div>
        </div>
        <div>
          Production Countries:
          <div className={styles.singleHero_list}>
            {renderList(movieData.production_countries, 'name')}
          </div>
        </div>
        <div>
          Spoken Languages:
          <div className={styles.singleHero_list}>
            {renderList(movieData.spoken_languages, 'english_name')}
          </div>
        </div>
      </div>
    </>
  )
}
