'use client'

import useFetcher from '@/hooks/useFetcher'
import { Seasons } from '@/types/data'
import MainCard from '@/components/UI/MainCard'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'

interface AllVideosProps {
  params: { id: string }
}

export default function AllSeasons({ params }: AllVideosProps) {
  const { data, isLoading, isError } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${params.id}&combinedEndpoints=tv/${params.id}`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">{data.name}</h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left gap-4 m-auto">
        {data.seasons.map((season: Seasons, index: number) => (
          <MainCard
            key={index}
            type={'tv'}
            id={params.id}
            image={season.poster_path}
            name={season.name}
            date={season.air_date}
            vote_average={season.vote_average}
            seasonNumber={season.season_number}
          />
        ))}
      </div>
    </main>
  )
}
