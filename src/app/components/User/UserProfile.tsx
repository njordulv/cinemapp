import UserHero from '@/components/User/UserHero'
import ChangeAvatar from '@/components/User/ChangeAvatar'

const UserProfile = () => {
  return (
    <>
      <UserHero />
      <main className="flex flex-col w-full max-w-[1170px] m-auto px-4 py-10 gap-5">
        <ChangeAvatar />
      </main>
    </>
  )
}

export default UserProfile
