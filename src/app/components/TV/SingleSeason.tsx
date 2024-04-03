'use client'

import { Card, Image, CardBody, Chip } from '@nextui-org/react'
import { IoStarSharp } from 'react-icons/io5'
import useFetcher from '@/hooks/useFetcher'
import { Episodes } from '@/types/data'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import { formatReleaseDate } from '@/utils/formatDate'

export default function SingleSeason({
  params,
}: {
  params: { id: string; sId: number }
}) {
  const { id, sId } = params
  const { data, isLoading, isError } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${id}/season/${sId}`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />

  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">{data.name}</h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto">
        {data?.episodes?.map((episode: Episodes, index: number) => (
          <Card
            isBlurred
            className="border-none bg-default-50"
            shadow="sm"
            key={episode.id || index}
          >
            <CardBody>
              <div className="grid grid-flow-col lg:grid-cols-[3fr_9fr] gap-6 md:gap-4 items-start justify-center">
                <div className="relative max-w-[270px]">
                  <Image
                    className="object-cover"
                    height="100%"
                    width="100%"
                    shadow="md"
                    src={
                      episode?.still_path
                        ? `${BASE_IMAGE_URL}w300${episode?.still_path}`
                        : NO_IMAGE
                    }
                    fallbackSrc={NO_IMAGE}
                    alt={episode?.name || 'Unknown'}
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-foreground/90 mb-2 pr-10">
                        <span className="text-default-600 absolute right-3 top-3">
                          {episode?.episode_number}&nbsp;
                        </span>
                        {episode?.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Chip
                          startContent={<IoStarSharp size={16} />}
                          variant="flat"
                          className="bg-dark text-white"
                        >
                          {episode?.vote_average ?? 'No rating'}
                        </Chip>
                        <p className="text-small font-normal">
                          {episode?.air_date
                            ? formatReleaseDate(episode.air_date)
                            : 'Unknown date'}
                        </p>
                      </div>
                      <p className="text-large font-normal mt-2">
                        {episode?.runtime} min
                      </p>
                      <p className="text-medium font-normal mt-2">
                        {episode?.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  )
}
