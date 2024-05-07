import { Tabs, Tab } from '@nextui-org/react'
import ChangeAvatar from '@/components/User/ChangeAvatar'
import ChangeName from '@/components/User/ChangeName'
import UserWatchlist from '@/components/User/UserWatchlist'

export default function UserTabs() {
  return (
    <Tabs
      key="bordered"
      variant="bordered"
      aria-label="User Profile tabs"
      classNames={{
        base: 'bg-default-50 bg-opacity-20 rounded-xl',
        panel: 'p-0 p-0',
        tabList: 'border-1 w-full',
        cursor: '',
        tab: 'text-[17px] px-6 font-normal',
        tabContent: '',
      }}
    >
      <Tab key="watchlist tab" title="Watchlist">
        <UserWatchlist />
      </Tab>
      <Tab key="edit tab" title="Edit Profile">
        <div className="p-8 border border-default-200 bg-gradient-to-br dark:from-default-50 dark:to-black rounded-lg flex flex-col gap-6">
          <ChangeAvatar />
          <ChangeName />
        </div>
      </Tab>
    </Tabs>
  )
}
