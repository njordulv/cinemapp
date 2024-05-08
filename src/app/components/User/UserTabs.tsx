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
        panel: 'p-0 p-0 flex justify-center items-center min-h-72',
        tabList: 'border-1 w-full',
        cursor: '',
        tab: 'text-md sm:text-[17px] px-6 font-normal px-3',
        tabContent: '',
      }}
    >
      <Tab key="Watchlist tab" title="Watchlist" className="watchlistTab">
        <UserWatchlist />
      </Tab>
      <Tab key="Favorites tab" title="Favorites" className="favoritesTab">
        <UserFavorites />
      </Tab>
      <Tab key="Edit tab" title="Edit Profile">
        <div className=" max-w-[560px] gap-6 w-full">
          <ChangeAvatar />
          <ChangeName />
        </div>
      </Tab>
    </Tabs>
  )
}
