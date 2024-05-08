import { Tabs, Tab, ScrollShadow } from '@nextui-org/react'
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
        base: 'bg-default-50 bg-opacity-20 rounded-xl',
        panel: 'p-0 p-0',
        tabList: 'border-1 w-full',
        cursor: '',
        tab: 'text-md sm:text-[17px] px-6 font-normal px-3',
        tabContent: '',
      }}
    >
      <Tab key="seasons" title="Seasons">
        <ScrollShadow orientation="horizontal" className="w-full">
          <div className="flex w-max space-x-3 pb-3">
            {data.seasons && <Season id={id} seasons={data.seasons} />}
          </div>
        </ScrollShadow>
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
