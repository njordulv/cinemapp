import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import SeasonsData from '@/types/SeasonsData'
import Season from '@/components/UI/Season'

interface DataMovie {
  id: string
  data: {
    seasons: SeasonsData[]
  }
}

export default function SeasonsTabs({ id, data }: DataMovie) {
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
      <Tab key="seasons" title="Seasons">
        <Card className="bg-blueDark">
          <CardBody>
            <div className="grid lg:grid-cols-5 gap-3">
              {data.seasons && <Season id={id} seasons={data.seasons} />}
            </div>
          </CardBody>
        </Card>
      </Tab>
      <Tab key="last" title="Last Season">
        <Card className="bg-blueDark">
          <CardBody></CardBody>
        </Card>
      </Tab>
      <Tab
        key="allSeasons"
        title="All Seasons"
        href={`/tv/${id}/seasons`}
      ></Tab>
    </Tabs>
  )
}
