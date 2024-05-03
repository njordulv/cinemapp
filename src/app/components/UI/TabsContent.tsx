import { Tabs, Tab, ScrollShadow } from '@nextui-org/react'
import { Credits } from '@/types/data'
import Cast from '@/components/UI/Cast'
import Crew from '@/components/UI/Crew'
import VideoTab from '@/components/UI/VideoTab'

interface DataMovie {
  id: string
  data: {
    credits: Credits
  }
  isMovie: boolean
}

export default function TabsContent({ id, data, isMovie }: DataMovie) {
  const pageType = isMovie ? 'movie' : 'tv'

  return (
    <Tabs
      key="bordered"
      variant="bordered"
      aria-label={`${pageType} options`}
      classNames={{
        base: 'bg-default-50 bg-opacity-20 rounded-xl',
        panel: 'p-0 p-0',
        tabList: 'border-1 w-full',
        cursor: '',
        tab: 'text-[17px] px-6 font-normal',
        tabContent: '',
      }}
    >
      <Tab key={`${pageType} cast`} title="Cast">
        {(data.credits.cast?.length ?? 0) > 0 && (
          <Cast cast={data.credits.cast} />
        )}
      </Tab>
      <Tab key={`${pageType} crew`} title="Crew">
        <ScrollShadow className="h-[352px]" isEnabled={false}>
          {(data.credits.crew?.length ?? 0) > 0 && (
            <Crew crew={data.credits.crew} />
          )}
        </ScrollShadow>
      </Tab>
      <Tab key={`${pageType} trailers`} title="Trailers">
        <VideoTab movieId={id} isMovie={isMovie} />
      </Tab>
      <Tab
        key={`${pageType} all videos`}
        title="All Videos"
        href={`/${pageType}/${id}/videos`}
      ></Tab>
    </Tabs>
  )
}
