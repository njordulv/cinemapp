'use client'

import YouTube from 'react-youtube'
import { VideoTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import SkeletonForTab from '@/components/Video/SkeletonForTab'

const VideoTab: React.FC<VideoTypes> = ({ movieId, isMovie }: VideoTypes) => {
  const pageType = isMovie ? 'movie' : 'tv'
  const { data, isLoading, isError } = useFetcher({
    endpoint: `/api/movies?endpoint=${pageType}/${movieId}/videos`,
  })

  const videos = data?.results || []

  return (
    <div
      className={`grid text-center lg:max-w-[1170px] min-h-[225px] lg:w-full lg:mb-0 ${
        videos.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
      } lg:text-left gap-4`}
    >
      {isLoading ? (
        <>
          {[...Array(2)].map((_, index) => (
            <SkeletonForTab key={index} />
          ))}
        </>
      ) : isError ? (
        <div className="text-xl text-white">Error loading videos</div>
      ) : videos.length > 0 ? (
        videos.slice(0, 2).map((video: VideoTypes, index: number) => (
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
