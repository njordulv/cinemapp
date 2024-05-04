import UserHero from '@/components/User/UserHero'
import ChangeAvatar from '@/components/User/ChangeAvatar'
import ChangeName from '@/components/User/ChangeName'

const UserProfile = () => {
  return (
    <>
      <UserHero />
      <main className="flex flex-col w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
        <div className="p-8 border border-default-200 bg-gradient-to-br dark:from-default-50 dark:to-black rounded-lg flex flex-col gap-6">
          <ChangeAvatar />
          <ChangeName />
        </div>
      </main>
    </>
  )
}

export default UserProfile
