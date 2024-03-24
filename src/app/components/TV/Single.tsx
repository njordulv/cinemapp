'use client'

import { Divider } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import Hero from '@/components/UI/Hero'
import TabsContent from '@/components/UI/TabsContent'
import SeasonsTabs from '@/components/TV/SeasonsTabs'
import ListRenderer from '@/components/UI/ListRenderer'
import Error from '@/components/UI/Error'
import Loader from '@/components/UI/Loader'
import styles from '@/styles/singleMovie.module.scss'

interface Props {
  params: { id: string }
}

export default function Single({ params }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${params.id}&combinedEndpoints=tv/${params.id}/credits`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  const {
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
    created_by,
  } = data

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
        created_by={created_by}
      />
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto px-6 py-10">
        <div className="grid lg:grid-cols-[3fr_1fr] gap-3">
          <section className="flex w-full flex-col relative overflow-hidden">
            <TabsContent id={params.id} data={data} isMovie={isMovie} />
            <Divider className="my-10 bg-blueDark" />
            <SeasonsTabs id={params.id} data={data} />
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
                <ListRenderer items={production_companies} keyName="name" />
              </div>
            </div>
            <div>
              <b>Production Countries:</b>
              <div className={styles.singleHero_list}>
                <ListRenderer items={production_countries} keyName="name" />
              </div>
            </div>
            <div>
              <b>Spoken Languages:</b>
              <div className={styles.singleHero_list}>
                <ListRenderer items={spoken_languages} keyName="english_name" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
