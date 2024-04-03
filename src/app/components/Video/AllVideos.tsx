'use client'

import { Card, CardFooter, CardBody } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import type { ParamsWithId } from '@/types/params'
import { VideoTypes } from '@/types/data'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import YoutubeUI from '@/components/UI/YoutubeUI'

interface AllVideosProps {
  params: ParamsWithId
  contentType: 'tv' | 'movie'
}

export default function AllVideos({ params, contentType }: AllVideosProps) {
  const { id } = params
  const endpointType = `/api/movies?endpoint=${contentType}/${id}/videos`
  const { data, isLoading, isError } = useFetcher({ endpoint: endpointType })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">Videos</h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-4 m-auto">
        {data.results &&
          data.results.map((video: VideoTypes, index: number) => (
            <Card shadow="md" key={index} className="bg-grey">
              <CardBody className="overflow-visible p-0 flex-none">
                <YoutubeUI
                  videoData={[video]}
                  iframe="rounded-lg rounded-b-none"
                />
              </CardBody>
              <CardFooter className="flex flex-col text-small items-start">
                <b className="text-[15px]">{video.name}</b>
                <p className="text-[15px] text-left leading-[18px]">
                  {video.type}
                </p>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  )
}
