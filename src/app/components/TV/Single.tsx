'use client'

import {
  Chip,
  Tabs,
  Tab,
  Card,
  CardBody,
  ScrollShadow,
} from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import Hero from '@/components/UI/Hero'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import Cast from '@/components/UI/Cast'
import Crew from '@/components/UI/Crew'
import VideoTab from '@/components/Video/VideoTab'
import styles from '@/styles/singleMovie.module.scss'

type ListItem = {
  id?: number
  name?: string
  english_name?: string
}

export default function Single({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${params.id}&combinedEndpoints=tv/${params.id}/credits`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  const {
    id,
    name,
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
    vote_count,
    spoken_languages,
    production_countries,
    production_companies,
    status,
    popularity,
    first_air_date,
  } = data

  const renderList = (items: ListItem[], key: keyof ListItem = 'name') =>
    items &&
    items.map((item, index) => (
      <Chip size="sm" key={item.id || index}>
        {item[key]}
      </Chip>
    ))

  const isMovie = false

  return (
    <>
      <Hero
        name={name}
        genres={genres}
        vote_average={vote_average}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        release_date={release_date}
        budget={budget}
        revenue={revenue}
        tagline={tagline}
        overview={overview}
        homepage={homepage}
        imdb_id={imdb_id}
        first_air_date={first_air_date}
        isMovie={isMovie}
      />
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
                      {data.credits.crew && <Crew crew={data.credits.crew} />}
                    </ScrollShadow>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="trailers" title="Trailers">
                <Card className="bg-blueDark">
                  <CardBody>
                    <VideoTab movieId={id} contentType={'tv'} />
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="allVideos"
                title="All Videos"
                href={`/tv/${id}/videos`}
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
