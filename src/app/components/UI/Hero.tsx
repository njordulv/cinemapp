import Link from 'next/link'
import { Image } from '@nextui-org/react'
import { Parallax } from 'react-parallax'
import { TbWorldWww } from 'react-icons/tb'
import { LiaImdb } from 'react-icons/lia'
import { BsCurrencyDollar } from 'react-icons/bs'
import { HeroTypes } from '@/types/data'
import { formatReleaseDate, formatReleaseYear } from '@/utils/formatDate'
import ContentRatings from '@/components/UI/ContentRatings'
import Certification from '@/components/UI/Certification'
import ListRenderer from '@/components/UI/ListRenderer'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import ToggleWatchlist from '@/components/User/ToggleWatchlist'
import ToggleFavorites from '@/components/User/ToggleFavorites'
import FilmMakers from '@/components/UI/FilmMakers'
import formatBudget from '@/utils/formatBudget'
import convertMinToHrs from '@/utils/formatRuntime'
import styles from '@/styles/singleMovie.module.scss'

export default function Hero({
  id,
  title,
  name,
  backdrop_path,
  poster_path,
  release_date,
  runtime,
  budget,
  revenue,
  tagline,
  overview,
  genres,
  vote_average,
  homepage,
  imdb_id,
  first_air_date,
  isMovie,
  type,
  created_by,
  filmMaker,
  production_countries,
}: HeroTypes) {
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <section className={styles.singleHero}>
      <Parallax
        blur={0}
        bgImageStyle={{
          opacity: 0.4,
          objectFit: 'cover',
        }}
        bgImage={
          backdrop_path
            ? `${BASE_IMAGE_URL}w1920_and_h800_multi_faces${backdrop_path}`
            : `${NO_IMAGE}`
        }
        bgImageAlt={`${isMovie ? title : name} poster image`}
        strength={400}
      >
        <div className="grid text-center lg:max-w-[1170px] lg:w-full sm:grid-cols-1 lg:text-left gap-4 m-auto sm:py-20 py-10 px-6">
          <div
            className={`grid sm:grid-cols-[2fr_3fr] md:grid-cols-[3fr_7fr] lg:grid-cols-[1fr_3fr] gap-6 lg:gap-10 items-start justify-items-center ${styles.singleHero_wrapper}`}
          >
            <Image
              shadow="md"
              className="object-cover"
              src={
                poster_path
                  ? `${BASE_IMAGE_URL}w300${poster_path}`
                  : '/no-image-300x450.svg'
              }
              width={300}
              height={450}
              fallbackSrc={'/no-image-300x450.svg'}
              alt={isMovie ? title : name}
            />
            <div className="flex flex-col gap-4 text-left">
              <div>
                <h1 className="mb-1 text-shadow-sm inline-block">
                  {isMovie ? title : name}
                  <span className="font-thin opacity-80 ml-2">
                    {formatReleaseYear(
                      isMovie ? release_date ?? '' : first_air_date ?? ''
                    )}
                  </span>
                </h1>
                <div className={styles.singleHero_info}>
                  {isMovie ? (
                    <Certification
                      id={id}
                      production_countries={production_countries}
                    />
                  ) : (
                    <ContentRatings
                      id={id}
                      production_countries={production_countries}
                    />
                  )}
                  <div className="text-shadow-sm min-w-max">
                    {formatReleaseDate(
                      isMovie ? release_date ?? '' : first_air_date ?? ''
                    )}
                  </div>
                  <div className={styles.singleHero_list}>
                    <ListRenderer items={genres} keyName="name" />
                  </div>
                  {runtime && (
                    <div className="text-shadow-sm min-w-12">
                      {convertMinToHrs(runtime)}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row md:gap-5">
                <div className="flex gap-3 items-center sm:gap-5">
                  <div className={styles.singleHero_average}>
                    {vote_average ? (
                      <VoteAverage
                        vote={vote_average}
                        card="min-w-[63px] min-h-[63px]"
                        size="w-14 h-14 drop-shadow-md"
                        strokeWidth={2}
                        text="text-[19px]"
                      />
                    ) : (
                      <VoteDisabled
                        card="min-w-[63px] min-h-[63px]"
                        size="w-14 h-14 drop-shadow-md"
                        strokeWidth={2}
                        text="text-[19px] top-[3px] relative"
                      />
                    )}
                    <span className="text-shadow-sm">User Score</span>
                  </div>
                  <div className="flex gap-2">
                    <ToggleWatchlist id={id} type={isMovie ? 'movie' : 'tv'} />
                    <ToggleFavorites id={id} type={isMovie ? 'movie' : 'tv'} />
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  {budget > 0 && (
                    <div className="flex flex-col">
                      <span className="text-shadow-sm font-normal">
                        Budget:
                      </span>
                      <span className="text-shadow-sm flex items-center">
                        <BsCurrencyDollar />
                        {formatBudget(budget)}
                      </span>
                    </div>
                  )}
                  {revenue > 0 && (
                    <div className="flex flex-col">
                      <span className="text-shadow-sm font-normal">
                        Revenue:
                      </span>
                      <div className="text-shadow-sm flex items-center">
                        <BsCurrencyDollar />
                        {formatBudget(revenue)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {tagline && (
                <div className="italic font-thin text-[18px] text-shadow-sm">
                  {tagline}
                </div>
              )}
              {overview && (
                <div className="text-shadow-sm">
                  <h3 className="mb-1">Overview:</h3>
                  <p>{overview}</p>
                </div>
              )}
              {homepage && (
                <div className="flex flex-row">
                  <Link
                    href={homepage}
                    target="_blank"
                    className="inline-flex items-center gap-1 font-thin hover:text-cyan text-shadow-sm"
                  >
                    <TbWorldWww size={24} /> {isMovie ? title : name}
                  </Link>
                </div>
              )}
              {imdb_id && (
                <div className="flex flex-row">
                  <Link
                    href={`https://www.imdb.com/title/${imdb_id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 font-thin hover:text-cyan text-shadow-sm"
                  >
                    <LiaImdb size={24} /> IMDb
                  </Link>
                </div>
              )}
              <div className="flex sm:flex-row sm:gap-10 lg:gap-24 text-left flex-col gap-4">
                {isMovie ? (
                  <FilmMakers
                    filmMaker={filmMaker}
                    position={filmMaker && 'Directed by'}
                    job="Director"
                  />
                ) : (
                  <FilmMakers
                    filmMaker={created_by}
                    position="Created by"
                    isCreator={true}
                    job="Original Music Composer"
                  />
                )}
                <FilmMakers
                  filmMaker={filmMaker}
                  position="Composed by"
                  job="Original Music Composer"
                />
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  )
}
