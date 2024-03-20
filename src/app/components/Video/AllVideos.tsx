'use client'

import { Card, CardFooter, CardBody } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import VideoData from '@/types/videoData'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import YoutubeUI from '@/components/UI/YoutubeUI'

export default function AllVideos({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/${params.id}/videos`,
  })

  if (isError) return <Error errorText={isError.message} />

  if (isLoading) return <Loader />

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">Videos</h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-4 m-auto">
        {data.results &&
          data.results.map((video: VideoData, index: number) => (
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
