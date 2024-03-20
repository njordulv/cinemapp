'use client'

import Link from 'next/link'
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
import useFetcher from '@/hooks/useFetcher'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import Cast from '@/components/UI/Cast'
import Crew from '@/components/UI/Crew'
import VideoTab from '@/components/Video/VideoTab'
import { formatReleaseDateAlt, formatReleaseYear } from '@/utils/formatDate'
import { convertMinToHrs } from '@/utils/formatRuntime'
import formatBudget from '@/utils/formatBudget'
import styles from '@/styles/singleMovie.module.scss'

type ListItem = {
  id?: number
  name?: string
  english_name?: string
}

export default function Single({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/${params.id}&combinedEndpoints=movie/${params.id}/credits`,
  })
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  const {
    id,
    title,
    genres,
    vote_average,
    backdrop_path,
    poster_path,
    release_date,
    budget,
    revenue,
    tagline,
    overview,
    homepage,
    imdb_id,
    runtime,
    vote_count,
    spoken_languages,
    production_countries,
    production_companies,
    status,
    popularity,
  } = data

  const renderList = (items: ListItem[], key: keyof ListItem = 'name') =>
    items &&
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
              alt={title}
            />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="flex mb-1 gap-2 text-shadow-sm">
                  {title}
                  <span className="font-thin opacity-80">
                    ({formatReleaseYear(release_date)})
                  </span>
                </h1>
                <div className={styles.singleHero_info}>
                  <div className="uppercase">
                    {formatReleaseDateAlt(release_date)}
                  </div>
                  <div className={styles.singleHero_list}>
                    {renderList(genres)}
                  </div>
                  <div>{convertMinToHrs(runtime)}</div>
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
                    <TbWorldWww size={24} /> {title}
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
            </div>
          </div>
        </div>
      </div>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto px-6 py-10">
        <div className="grid lg:grid-cols-[3fr_1fr] gap-3">
          <section className="flex w-full flex-col relative overflow-hidden">
            <Tabs
              key="bordered"
              variant="bordered"
              aria-label="Options"
              classNames={{
                panel: 'px-0 pb-0',
                tabList: 'border-transpLight border-1',
                cursor: '',
                tab: 'text-[17px] px-6 font-normal',
                tabContent: 'text-soft',
              }}
            >
              <Tab key="cast" title="Cast">
                <Card className="bg-blueDark">
                  <CardBody>
                    {data.credits.cast && <Cast cast={data.credits.cast} />}
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="crew" title="Crew">
                <Card className="bg-blueDark">
                  <CardBody>
                    <ScrollShadow className="h-[420px]" isEnabled={false}>
                      <Crew crew={data.credits.crew} />
                    </ScrollShadow>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="trailers" title="Trailers">
                <Card className="bg-blueDark">
                  <CardBody>
                    <VideoTab movieId={id} />
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="allVideos"
                title="All Videos"
                href={`/movie/${id}/videos`}
              ></Tab>
            </Tabs>
          </section>
          <aside>
            <div>
              <b>Rating:</b> {vote_average}
            </div>
            <div>
              <b>Vote Count:</b> {vote_count}
            </div>
            <div>
              <b>Popularity:</b> {popularity}
            </div>
            <div>
              <b>Status:</b> {status}
            </div>
            <div>
              <b>Production Companies:</b>
              <div className={styles.singleHero_list}>
                {renderList(production_companies)}
              </div>
            </div>
            <div>
              <b>Production Countries:</b>
              <div className={styles.singleHero_list}>
                {renderList(production_countries, 'name')}
              </div>
            </div>
            <div>
              <b>Spoken Languages:</b>
              <div className={styles.singleHero_list}>
                {renderList(spoken_languages, 'english_name')}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
