'use client'

import { Parallax } from 'react-parallax'
import { Avatar } from '@nextui-org/react'
import { useAppSelector } from '@/hooks/reduxHooks'
import { useAuth } from '@/hooks/useAuth'
import { selectAvatar } from '@/redux/slices/avatarSlice'
import { formatReleaseDate } from '@/utils/formatDate'
import styles from '@/styles/dashboard.module.scss'

const UserHero = () => {
  const { email, createdAt } = useAuth()
  const avatar = useAppSelector(selectAvatar)

  return (
    <section className={styles.singleHero}>
      <Parallax
        blur={2}
        bgImageStyle={{ filter: 'brightness(0.55) opacity(0.8)' }}
        bgImage={'/dashboard-bg.jpg'}
        bgImageAlt="dashboard back"
        strength={400}
      >
        <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 md:grid-cols-1 lg:text-left gap-4 m-auto py-20 px-6">
          <div
            className={`grid md:grid-cols-[1fr_4fr] gap-10 items-center ${styles.singleHero_wrapper}`}
          >
            <Avatar
              className="transition-transform text-5xl w-48 h-48 capitalize"
              color="default"
              src={avatar.avatarUrl || './no-image.svg'}
            />
            <div className="flex flex-col gap-3 text-shadow-sm">
              <h1>Welcome</h1>
              <div className="text-3xl font-normal">{email}</div>
              <div className="text-default-800">
                {createdAt
                  ? `Member since ${formatReleaseDate(createdAt)}`
                  : 'Member since unknown date'}
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  )
}

export default UserHero
