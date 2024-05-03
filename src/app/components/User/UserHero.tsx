'use client'

import { Parallax } from 'react-parallax'
import { Avatar } from '@nextui-org/react'
import { SlUser } from 'react-icons/sl'
import { useAuth } from '@/hooks/useAuth'
import { formatReleaseDate } from '@/utils/formatDate'
import styles from '@/styles/dashboard.module.scss'

const UserHero = () => {
  const { email, createdAt, photoURL, name } = useAuth()

  return (
    <section className={styles.singleHero}>
      <Parallax
        bgImageStyle={{ filter: 'brightness(0.55) opacity(0.8)' }}
        bgImage={'/dashboard-bg.jpg'}
        bgImageAlt="dashboard back"
        strength={400}
      >
        <div className="grid lg:max-w-[1170px] w-full sm:grid-cols-1 text-center sm:text-left gap-4 m-auto py-20 px-6">
          <div
            className={`grid sm:grid-cols-[1fr_4fr] gap-10 items-center justify-center ${styles.singleHero_wrapper}`}
          >
            <Avatar
              showFallback
              src={photoURL || ''}
              className="transition-transform w-48 h-48"
              fallback={
                <SlUser
                  className="text-default-500"
                  fill="currentColor"
                  size={90}
                />
              }
            />
            <div className="flex flex-col gap-3 text-shadow-sm">
              <h1>{name ? name : 'Welcome Guest!'}</h1>
              <h2 className="text-xl font-medium">{email}</h2>
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
