import Link from 'next/link'
import { Image, Chip } from '@nextui-org/react'
import { TbWorldWww } from 'react-icons/tb'
import { LiaImdb } from 'react-icons/lia'
import { BsCurrencyDollar } from 'react-icons/bs'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import Creator from '@/components/UI/Creator'
import { formatReleaseDateAlt, formatReleaseYear } from '@/utils/formatDate'
import formatBudget from '@/utils/formatBudget'
import HeroData from '@/types/HeroData'
import styles from '@/styles/singleMovie.module.scss'

type ListItem = {
  id?: number
  name?: string
  english_name?: string
}

export default function Hero({
  title,
  name,
  backdrop_path,
  poster_path,
  release_date,
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
  created_by,
}: HeroData) {
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  const renderList = (items: ListItem[], key: keyof ListItem = 'name') =>
    items &&
    items.map((item, index) => (
      <Chip size="sm" key={item.id || index}>
        {item[key]}
      </Chip>
    ))

  return (
    <section className={styles.singleHero}>
      <div
        style={{
          backgroundImage: backdrop_path
            ? `url(${BASE_IMAGE_URL}original/${backdrop_path})`
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
              poster_path ? `${BASE_IMAGE_URL}w300/${poster_path}` : NO_IMAGE
            }
            width={300}
            height={450}
            fallbackSrc={NO_IMAGE}
            alt={isMovie ? title : name}
          />
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="flex mb-1 gap-2 text-shadow-sm">
                {isMovie ? title : name}
                <span className="font-thin opacity-80">
                  {formatReleaseYear(
                    isMovie ? release_date ?? '' : first_air_date ?? ''
                  )}
                </span>
              </h1>
              <div className={styles.singleHero_info}>
                <div className="uppercase">
                  {formatReleaseDateAlt(
                    isMovie ? release_date ?? '' : first_air_date ?? ''
                  )}
                </div>
                <div className={styles.singleHero_list}>
                  {renderList(genres)}
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className={styles.singleHero_average}>
                {vote_average ? (
                  <VoteAverage
                    vote={vote_average}
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
              {budget > 0 && (
                <div className="flex flex-col">
                  <span className="text-shadow-sm font-normal">Budget:</span>
                  <span className="text-shadow-sm flex items-center">
                    <BsCurrencyDollar />
                    {formatBudget(budget)}
                  </span>
                </div>
              )}
              {revenue > 0 && (
                <div className="flex flex-col">
                  <span className="text-shadow-sm font-normal">Revenue:</span>
                  <div className="text-shadow-sm flex items-center">
                    <BsCurrencyDollar />
                    {formatBudget(revenue)}
                  </div>
                </div>
              )}
            </div>
            {tagline && (
              <div className="italic font-thin text-[18px] text-shadow-sm opacity-80">
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
              <div>
                <Link
                  href={homepage}
                  target="
                _blank"
                  className="inline-flex items-center gap-1 font-thin hover:text-cyan-500 text-shadow-sm"
                >
                  <TbWorldWww size={24} /> {isMovie ? title : name}
                </Link>
              </div>
            )}
            {imdb_id && (
              <div>
                <Link
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="
                _blank"
                  className="inline-flex items-center gap-1 font-thin hover:text-cyan-500 text-shadow-sm"
                >
                  <LiaImdb size={24} /> IMDb
                </Link>
              </div>
            )}
            {isMovie ? '' : <Creator created_by={created_by} />}
          </div>
        </div>
      </div>
    </section>
  )
}
