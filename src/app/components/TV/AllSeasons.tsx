'use client'

import { Card, Image, CardFooter, CardBody } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import SeasonsData from '@/types/SeasonsData'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'

interface AllVideosProps {
  params: { id: string }
}

export default function AllSeasons({ params }: AllVideosProps) {
  const { data, isLoading, isError } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${params.id}&combinedEndpoints=tv/${params.id}`,
  })
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        {data.name}&nbsp;<span className="font-light">- Seasons</span>
      </h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left gap-4 m-auto">
        {data.seasons.map((season: SeasonsData, index: number) => (
          <Card shadow="md" key={index} className="bg-grey">
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="md"
                width="100%"
                className="w-full object-cover rounded-b-none"
                src={
                  season.poster_path
                    ? `${BASE_IMAGE_URL}w300/${season.poster_path}`
                    : NO_IMAGE
                }
                alt={season.name || 'Unknown'}
              />
            </CardBody>
            <CardFooter className="flex flex-col text-small items-start">
              <b className="text-[15px]">{season.name}</b>
              <p className="text-[15px] text-left leading-[18px]">
                {season.season_number}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
