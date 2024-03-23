'use client'

import { Spinner } from '@nextui-org/react'
import YouTube from 'react-youtube'
import VideoData from '@/types/videoData'
import useFetcher from '@/hooks/useFetcher'

const VideoTab: React.FC<VideoData> = ({ movieId }: VideoData) => {
  const endpointType = `/api/movies?endpoint=tv/${movieId}/videos`
  const { data, isLoading, isError } = useFetcher({
    endpoint: endpointType,
  })

  const videos = data?.results || []

  return (
    <div
      className={`min-h-[280px] grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 ${
        videos.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
      } lg:text-left gap-4`}
    >
      {isLoading ? (
        <Spinner color="default" size="lg" className="place-content-center" />
      ) : isError ? (
        <div className="text-xl text-white">Error loading videos</div>
      ) : videos.length > 0 ? (
        videos.slice(0, 2).map((video: VideoData, index: number) => (
          <YouTube
            videoId={video.key}
            id={`youtube-player-${index}`}
            iframeClassName="rounded-lg"
            title={video.name}
            key={video.id || index}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 0,
                controls: 5,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
        ))
      ) : (
        <div className="text-xl text-white">No videos available</div>
      )}
    </div>
  )
}

export default VideoTab
