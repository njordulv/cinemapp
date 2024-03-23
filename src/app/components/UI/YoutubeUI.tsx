'use client'

import React from 'react'
import YouTube, { YouTubeProps as YTProps } from 'react-youtube'
import { VideoTypes } from '@/types/data'

interface Props {
  videoData: VideoTypes[]
  iframe?: string
}

const YoutubeUI: React.FC<Props> = ({ videoData, iframe }) => {
  const onPlayerReady: YTProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }

  const opts: YTProps['opts'] = {
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
  }

  return (
    <div>
      {videoData.map((video, index) => (
        <YouTube
          videoId={video.key}
          key={video.id || index}
          title={video.name}
          opts={opts}
          iframeClassName={iframe}
          onReady={onPlayerReady}
        />
      ))}
    </div>
  )
}

export default YoutubeUI
