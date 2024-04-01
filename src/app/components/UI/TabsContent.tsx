import { Tabs, Tab, Card, CardBody, ScrollShadow } from '@nextui-org/react'
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
        panel: 'px-0 pb-0',
        tabList: 'border-transpLight border-1',
        cursor: '',
        tab: 'text-[17px] px-6 font-normal',
        tabContent: 'text-soft',
      }}
    >
      <Tab key={`${pageType} cast`} title="Cast">
        <Card className="bg-blueDark">
          <CardBody>
            {data.credits.cast && <Cast cast={data.credits.cast} />}
          </CardBody>
        </Card>
      </Tab>
      <Tab key={`${pageType} crew`} title="Crew">
        <Card className="bg-blueDark">
          <CardBody>
            <ScrollShadow className="h-[352px]" isEnabled={false}>
              {data.credits.crew && <Crew crew={data.credits.crew} />}
            </ScrollShadow>
          </CardBody>
        </Card>
      </Tab>
      <Tab key={`${pageType} trailers`} title="Trailers">
        <Card className="bg-blueDark">
          <CardBody>
            <VideoTab movieId={id} isMovie={isMovie} />
          </CardBody>
        </Card>
      </Tab>
      <Tab
        key={`${pageType} all videos`}
        title="All Videos"
        href={`/${pageType}/${id}/videos`}
      ></Tab>
    </Tabs>
  )
}
