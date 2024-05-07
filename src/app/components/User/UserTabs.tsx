import { Tabs, Tab } from '@nextui-org/react'
import ChangeAvatar from '@/components/User/ChangeAvatar'
import ChangeName from '@/components/User/ChangeName'
import UserWatchlist from '@/components/User/UserWatchlist'
import UserFavorites from '@/components/User/UserFavorites'

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
        <div className="flex justify-center items-center min-h-72">
          <UserWatchlist />
        </div>
      </Tab>
      <Tab key="favorites tab" title="Favorites">
        <div className="flex justify-center items-center min-h-72">
          <UserFavorites />
        </div>
      </Tab>
      <Tab key="edit tab" title="Edit Profile">
        <div className="flex justify-center max-w-[560px] flex-col gap-6 w-full">
          <ChangeAvatar />
          <ChangeName />
        </div>
      </Tab>
    </Tabs>
  )
}
