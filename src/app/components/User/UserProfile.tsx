import UserHero from '@/components/User/UserHero'
import UserTabs from '@/components/User/UserTabs'

const UserProfile = () => {
  return (
    <>
      <UserHero />
      <main className="flex flex-col w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
        <UserTabs />
      </main>
    </>
  )
}

export default UserProfile
