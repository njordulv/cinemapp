'use client'

import Link from 'next/link'
import { Image, Chip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { TbWorldWww } from 'react-icons/tb'
import { LiaImdb } from 'react-icons/lia'
import { useSelector } from '@/redux/store'
import { selectTV } from '@/redux/slices/tvSlice'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import Cast from '@/components/UI/Cast'
import { CustomButton } from '@/components/UI/CustomButton'
import { formatReleaseDateAlt, formatReleaseYear } from '@/utils/formatDate'
import styles from '@/styles/singleMovie.module.scss'

const TVPost = () => {
  const tv = useSelector(selectTV)
  const router = useRouter()
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  if (!tv) {
    return <div>Loading or no tv selected...</div>
  }

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

  return (
    <>
      <div className={styles.singleHero}>
        <div
          style={{
            backgroundImage: tv.backdrop_path
              ? `url(${BASE_IMAGE_URL}original/${tv.backdrop_path})`
              : `url(${NO_IMAGE})`,
          }}
          className={styles.singleHero_back}
        ></div>
        <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto py-20 px-6">
          <div
            className={`grid lg:grid-cols-[1fr_3fr] gap-10 items-center ${styles.singleHero_wrapper}`}
          >
            <Image
              shadow="md"
              className="object-cover"
              src={
                tv.poster_path
                  ? `${BASE_IMAGE_URL}w300/${tv.poster_path}`
                  : NO_IMAGE
              }
              width={300}
              height={450}
              fallbackSrc={NO_IMAGE}
              alt={tv.original_name}
            />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="flex mb-1 gap-2 text-shadow-sm">
                  {tv.original_name}
                  <span className="font-thin opacity-80">
                    ({formatReleaseYear(tv.first_air_date)})
                  </span>
                </h1>
                <div className={styles.singleHero_info}>
                  <div className="uppercase">
                    {formatReleaseDateAlt(tv.first_air_date)}
                  </div>
                  <div className={styles.singleHero_list}>
                    {renderList(tv.genres)}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={styles.singleHero_average}>
                  {tv.vote_average ? (
                    <VoteAverage
                      vote={tv.vote_average}
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
              </div>
              {tv.tagline && (
                <div className="italic font-thin text-[18px] text-shadow-sm opacity-80">
                  {tv.tagline}
                </div>
              )}
              {tv.overview && (
                <div className="text-shadow-sm">
                  <h3 className="mb-1">Overview:</h3>
                  <p>{tv.overview}</p>
                </div>
              )}
              {tv.homepage && (
                <div>
                  <Link
                    href={tv.homepage}
                    target="
                    _blank"
                    className="inline-flex items-center gap-1 font-thin hover:text-cyan-500 text-shadow-sm"
                  >
                    <TbWorldWww size={24} /> {tv.original_name}
                  </Link>
                </div>
              )}
              {tv.imdb_id && (
                <div>
                  <Link
                    href={`https://www.imdb.com/title/${tv.imdb_id}`}
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
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto py-10">
        <div className="relative">
          <h3>Cast:</h3>
          <Cast />
          <div className="absolute right-[10px] bottom-0">
            <CustomButton
              color="primary"
              onClick={() => router.push(`/tv/${tv.id}/crew`)}
            >
              Crew
            </CustomButton>
          </div>
        </div>
        <p>Rating: {tv.vote_average}</p>
        <p>Vote Count: {tv.vote_count}</p>
        <p>Adult: {tv.adult ? 'Yes' : 'No'}</p>
        <p>Original Language: {tv.original_language}</p>
        <p>Original Title: {tv.original_title}</p>
        <p>Popularity: {tv.popularity}</p>
        <p>Budget: {tv.budget}</p>
        <p>Revenue: {tv.revenue}</p>
        <p>Status: {tv.status}</p>
        <p>Video: {tv.video ? 'Yes' : 'No'}</p>
        <div>
          Production Companies:
          <div className={styles.singleHero_list}>
            {renderList(tv.production_companies)}
          </div>
        </div>
        <div>
          Production Countries:
          <div className={styles.singleHero_list}>
            {renderList(tv.production_countries, 'name')}
          </div>
        </div>
        <div>
          Spoken Languages:
          <div className={styles.singleHero_list}>
            {renderList(tv.spoken_languages, 'english_name')}
          </div>
        </div>
      </div>
    </>
  )
}

export default TVPost
