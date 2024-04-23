'use client'

import { Avatar } from '@nextui-org/react'
import { Parallax } from 'react-parallax'
import { useSelector } from '@/redux/store'
import { selectUser } from '@/redux/slices/authSlice'
import { formatReleaseDate } from '@/utils/formatDate'
import ProtectedRoute from '@/components/Common/ProtectedRoute'
import ChangeAvatar from '@/components/Profile/ChangeAvatar'
import styles from '@/styles/dashboard.module.scss'

const DashboardPage = () => {
  const user = useSelector(selectUser)
  const name = user?.displayName ?? ''
  const email = user?.email ?? ''
  const creationTime = user?.metadata?.creationTime ?? ''

  return (
    <ProtectedRoute>
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
                name={name.substring(0, 1)}
              />
              <div className="flex flex-col gap-3 text-shadow-sm">
                <div className="text-3xl font-normal">
                  {name ? name : email}
                </div>
                <div className="text-default-800">
                  Member since {formatReleaseDate(creationTime)}
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </section>
      <section>
        <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 md:grid-cols-1 lg:text-left gap-4 m-auto py-20 px-6">
          <ChangeAvatar />
        </div>
      </section>
    </ProtectedRoute>
  )
}

export default DashboardPage
