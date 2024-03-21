'use client'

import { Chip } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import Hero from '@/components/UI/Hero'
import TabsContent from '@/components/UI/TabsContent'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import styles from '@/styles/singleMovie.module.scss'

type ListItem = {
  id?: number
  name?: string
  english_name?: string
}

interface Props {
  params: { id: string }
  contentType: string
}

export default function Single({ params }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/${params.id}&combinedEndpoints=movie/${params.id}/credits`,
  })

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

  const isMovie = true

  return (
    <>
      <Hero
        title={title}
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
        runtime={runtime}
        isMovie={isMovie}
      />
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto px-6 py-10">
        <div className="grid lg:grid-cols-[3fr_1fr] gap-3">
          <section className="flex w-full flex-col relative overflow-hidden">
            <TabsContent id={params.id} data={data} contentType={'movie'} />
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
