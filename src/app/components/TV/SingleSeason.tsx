'use client'

import { Card, Image, CardBody, Chip, Spinner } from '@nextui-org/react'
import { IoStarSharp } from 'react-icons/io5'
import { Episodes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import Error from '@/components/UI/Error'
import SeasonSkeleton from '@/components/TV/SeasonSkeleton'
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

  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL

  return (
    <>
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        {data?.name || <Spinner color="default" size="lg" />}
      </h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <SeasonSkeleton key={index} />
            ))}
          </>
        ) : data && data.episodes ? (
          data.episodes.map((episode: Episodes, index: number) => (
            <Card
              isBlurred
              className="border-none bg-default-50"
              shadow="sm"
              key={episode.id || index}
            >
              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-[5fr_9fr] md:grid-cols-[3fr_9fr] gap-6 md:gap-4 items-start justify-center">
                  <div className="relative sm:max-w-[270px]">
                    <Image
                      className="object-cover"
                      height="100%"
                      width="100%"
                      shadow="md"
                      src={
                        episode?.still_path
                          ? `${BASE_IMAGE_URL}w300${episode?.still_path}`
                          : '/no-image-270x152.svg'
                      }
                      fallbackSrc={'/no-image-270x152.svg'}
                      alt={episode?.name || 'Unknown'}
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2 w-full">
                        <h3 className="font-semibold m-0 pr-10 relative">
                          <span className="text-special absolute right-0 top-0">
                            {episode?.episode_number}&nbsp;
                          </span>
                          {episode?.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Chip
                            radius="sm"
                            startContent={
                              <IoStarSharp size={16} color="orange" />
                            }
                            variant="flat"
                            className="bg-dark text-white"
                          >
                            {episode?.vote_average ?? 'No rating'}
                          </Chip>
                          <p className="text-small font-normal m-0">
                            {episode?.air_date
                              ? formatReleaseDate(episode.air_date)
                              : 'Unknown date'}
                          </p>
                        </div>
                        <p className="text-large font-normal text-default-500 m-0">
                          {episode?.runtime} min
                        </p>
                        <p className="text-medium font-normal m-0">
                          {episode?.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : null}
      </div>
    </>
  )
}
