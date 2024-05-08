'use client'

import { Card } from '@nextui-org/react'
import type { ParamsWithId } from '@/types/params'
import { VideoTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import YoutubeUI from '@/components/UI/YoutubeUI'
import SkeletonForAll from '@/components/Video/SkeletonForAll'

interface AllVideosProps {
  params: ParamsWithId
  contentType: 'tv' | 'movie'
}

export default function AllVideos({ params, contentType }: AllVideosProps) {
  const { id } = params
  const endpointType = `/api/movies?endpoint=${contentType}/${id}/videos`
  const { data, isLoading, isError } = useFetcher({ endpoint: endpointType })

  if (isError)
    return (
      <h1 className="flex items-center justify-center font-medium mb-6 text-4xl text-red min-h-48">
        Error fetching data
      </h1>
    )

  if (isLoading || !data) {
    return (
      <>
        <h1 className="flex self-start font-medium mb-6 text-4xl">Videos</h1>
        <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-4 m-auto mt-0">
          {[...Array(6)].map((_, index) => (
            <SkeletonForAll key={index} />
          ))}
        </div>
      </>
    )
  }

  if (data.results.length === 0) {
    return (
      <h1 className="flex self-start font-medium mb-6 text-4xl">
        No videos available
      </h1>
    )
  }

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
      <h1 className="flex self-start font-medium mb-6 text-4xl">Videos</h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-4 m-auto mt-0">
        {data.results.length > 0 &&
          data.results.map((video: VideoTypes, index: number) => (
            <Card
              shadow="none"
              radius="sm"
              key={index}
              className="bg-transparent"
            >
              <YoutubeUI videoData={[video]} iframe="rounded-lg" />
              <div className="flex flex-col text-small items-start gap-1 pt-2 px-2">
                <b className="text-[15px]">{video.name}</b>
                <p className="text-[15px] text-left leading-[18px]">
                  {video.type}
                </p>
              </div>
            </Card>
          ))}
      </div>
    </main>
  )
}
