import { Tabs, Tab } from '@nextui-org/react'
import { Seasons } from '@/types/data'
import Season from '@/components/UI/Season'
import LastSeason from '@/components/TV/LastSeason'

interface DataMovie {
  id: string
  data: {
    seasons: Seasons[]
  }
}

export default function SeasonsTabs({ id, data }: DataMovie) {
  return (
    <Tabs
      key="bordered"
      variant="bordered"
      aria-label="TV Seasons"
      classNames={{
        panel: 'p-0 p-0',
        tabList: 'border-default-600 border-1',
        cursor: '',
        tab: 'text-[17px] px-6 font-normal',
        tabContent: 'text-soft',
      }}
    >
      <Tab key="seasons" title="Seasons">
        <div className="grid grid-cols-5 gap-3">
          {data.seasons && <Season id={id} seasons={data.seasons} />}
        </div>
      </Tab>
      <Tab key="last" title="Last Season">
        {data.seasons && <LastSeason id={id} seasons={data.seasons} />}
      </Tab>
      <Tab
        key="allSeasons"
        title="All Seasons"
        href={`/tv/${id}/seasons`}
      ></Tab>
    </Tabs>
  )
}
