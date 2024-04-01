'use client'

import useFetcher from '@/hooks/useFetcher'
import Hero from '@/components/UI/Hero'
import TabsContent from '@/components/UI/TabsContent'
import ListRenderer from '@/components/UI/ListRenderer'
import Recommendations from '@/components/UI/Recommendations'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import styles from '@/styles/singleMovie.module.scss'
import stylesAside from '@/styles/aside.module.scss'

interface Props {
  params: { id: string }
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
    spoken_languages,
    production_countries,
    production_companies,
    status,
  } = data

  const isMovie = true

  return (
    <>
      <Hero
        id={id}
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
        directed_by={data.credits.crew}
      />
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-6 m-auto px-6 py-10">
        <div className="grid lg:grid-cols-[8fr_3fr] gap-3">
          <section className="flex w-full flex-col relative overflow-hidden">
            <TabsContent id={params.id} data={data} isMovie={isMovie} />
          </section>
          <aside className={stylesAside.aside}>
            <h2 className="flex py-2 px-3 mb-3 font-medium text-[17px] leading-6 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent dark:bg-transparent shadow-sm rounded-medium border-transpLight border-1">
              Information
            </h2>
            <div className={stylesAside.aside_container}>
              <div className={stylesAside.aside_item}>
                <b>Status:</b>
                <div>{status}</div>
              </div>
              <div className={stylesAside.aside_item}>
                <b>Production Companies:</b>
                <div className={styles.singleHero_list}>
                  <ListRenderer items={production_companies} keyName="name" />
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
      </div>
    </>
  )
}
