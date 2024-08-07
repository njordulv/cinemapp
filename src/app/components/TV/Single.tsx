'use client'

import useFetcher from '@/hooks/useFetcher'
import Hero from '@/components/UI/Hero'
import TabsContent from '@/components/UI/TabsContent'
import NetworkLogo from '@/components/UI/NetworkLogo'
import ListRenderer from '@/components/UI/ListRenderer'
import Recommendations from '@/components/UI/Recommendations'
import SeasonsTabs from '@/components/TV/SeasonsTabs'
import Error from '@/components/UI/Error'
import Loader from '@/components/UI/Loader'
import Page404 from '@/src/app/404'
import styles from '@/styles/singleMovie.module.scss'
import stylesAside from '@/styles/aside.module.scss'

interface Props {
  params: { id: string }
}

export default function Single({ params }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${params.id}&combinedEndpoints=tv/${params.id}/credits`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />
  if (!data || typeof data === 'string') return <Page404 />
  if (data && data.status_code === 34) return <Page404 />

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
    spoken_languages,
    production_countries,
    status,
    first_air_date,
  } = data

  const isMovie = false

  return (
    <div>
      <Hero
        id={id}
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
        created_by={data.created_by}
        filmMaker={data.credits.crew}
        production_countries={production_countries}
      />
      <main className="relative overflow-hidden grid lg:max-w-[1170px] w-full grid-cols-1 text-left gap-6 m-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[8fr_3fr] gap-3">
          <section className="flex w-full flex-col relative overflow-hidden gap-3">
            <TabsContent id={params.id} data={data} isMovie={isMovie} />
            <SeasonsTabs id={params.id} data={data} />
          </section>
          <aside className={stylesAside.aside}>
            <h2 className="flex py-2 px-3 mb-3 font-medium text-[17px] leading-6 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-default-50 bg-opacity-20 shadow-sm rounded-medium border-default-200 border-1">
              Information
            </h2>
            <div
              className={`${stylesAside.aside_container} border-default-200 border-1`}
            >
              <div className={stylesAside.aside_item}>
                <b>Status:</b>
                <div>{status}</div>
              </div>
              {(data?.networks?.length ?? 0) > 0 && (
                <div className={stylesAside.aside_item}>
                  <b>Network:</b>
                  <div className={`${styles.singleHero_list}`}>
                    <NetworkLogo items={data.networks} />
                  </div>
                </div>
              )}
              {data.type && (
                <div className={stylesAside.aside_item}>
                  <b>Type:</b>
                  <div className={styles.singleHero_list}>{data.type}</div>
                </div>
              )}
              <div className={stylesAside.aside_item}>
                <b>Production Companies:</b>
                <div className={styles.singleHero_list}>
                  <NetworkLogo items={data.production_companies} />
                </div>
              </div>
              <div className={stylesAside.aside_item}>
                <b>Production Countries:</b>
                <div className={styles.singleHero_list}>
                  <ListRenderer items={production_countries} keyName="name" />
                </div>
              </div>
              <div className={stylesAside.aside_item}>
                <b>Spoken Languages:</b>
                <div className={styles.singleHero_list}>
                  <ListRenderer
                    items={spoken_languages}
                    keyName="english_name"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div>{data && <Recommendations id={id} isMovie={isMovie} />}</div>
      </main>
    </div>
  )
}
