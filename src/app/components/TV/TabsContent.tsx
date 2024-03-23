import { Tabs, Tab, Card, CardBody, ScrollShadow } from '@nextui-org/react'
import CreditsData from '@/types/CreditsData'
import Cast from '@/components/UI/Cast'
import Crew from '@/components/UI/Crew'
import VideoTab from '@/components/TV/VideoTab'

interface DataMovie {
  id: string
  data: {
    credits: CreditsData
  }
}

export default function TabsContent({ id, data }: DataMovie) {
  return (
    <Tabs
      key="bordered"
      variant="bordered"
      aria-label="Options"
      classNames={{
        panel: 'px-0 pb-0',
        tabList: 'border-transpLight border-1',
        cursor: '',
        tab: 'text-[17px] px-6 font-normal',
        tabContent: 'text-soft',
      }}
    >
      <Tab key="cast" title="Cast">
        <Card className="bg-blueDark">
          <CardBody>
            {data.credits.cast && <Cast cast={data.credits.cast} />}
          </CardBody>
        </Card>
      </Tab>
      <Tab key="crew" title="Crew">
        <Card className="bg-blueDark">
          <CardBody>
            <ScrollShadow className="h-[420px]" isEnabled={false}>
              {data.credits.crew && <Crew crew={data.credits.crew} />}
            </ScrollShadow>
          </CardBody>
        </Card>
      </Tab>
      <Tab key="trailers" title="Trailers">
        <Card className="bg-blueDark">
          <CardBody>
            <VideoTab movieId={id} />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="allVideos" title="All Videos" href={`/tv/${id}/videos`}></Tab>
    </Tabs>
  )
}
