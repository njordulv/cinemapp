'use client'

import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import YouTube from 'react-youtube'
import VideoData from '@/src/app/types/videoData'

const VideoTab: React.FC<VideoData> = ({ movieId }: VideoData) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (movieId) {
      fetch(`/api/movies?endpoint=movie/${movieId}/videos`)
        .then((response) => response.json())
        .then((data) => {
          setVideos(data.results)
        })
        .catch((error) => {
          console.error('Error fetching videos:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [movieId])

  return (
    <div
      className={`min-h-[280px] grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 ${
        videos.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
      } lg:text-left gap-4`}
    >
      {loading ? (
        <Spinner color="default" size="lg" className="place-content-center" />
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
        <div className="text-xl text-soft">No videos available</div>
      )}
    </div>
  )
}

export default VideoTab
