'use client'

import { Spinner } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import { Seasons } from '@/types/data'
import SkeletonBox from '@/components/UI/SkeletonBox'
import MainCard from '@/components/UI/MainCard'
import Error from '@/components/UI/Error'

interface AllVideosProps {
  params: { id: string }
}

export default function AllSeasons({ params }: AllVideosProps) {
  const { data, isLoading, isError } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${params.id}&combinedEndpoints=tv/${params.id}`,
  })

  if (isError) return <Error errorText={isError.message} />

  return (
    <main className="flex flex-col items-center place-content-center w-full max-w-[1170px] m-auto px-4 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        {data?.name || <Spinner color="default" size="lg" />}
      </h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left gap-4 m-auto">
        {isLoading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <SkeletonBox key={index} />
            ))}
          </>
        ) : data && data.seasons ? (
          data.seasons.map((season: Seasons, index: number) => (
            <MainCard
              key={index}
              type={'tv'}
              id={params.id}
              image={season.poster_path}
              name={season.name}
              dateAir={season.air_date}
              vote_average={season.vote_average}
              seasonNumber={season.season_number}
            />
          ))
        ) : null}
      </div>
    </main>
  )
}
