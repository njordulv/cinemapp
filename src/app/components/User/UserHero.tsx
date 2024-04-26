'use client'
import { Parallax } from 'react-parallax'
import { Avatar } from '@nextui-org/react'
import { SlUser } from 'react-icons/sl'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { formatReleaseDate } from '@/utils/formatDate'
import styles from '@/styles/dashboard.module.scss'

const UserHero = () => {
  const { email, createdAt, photoURL, id } = useAuth()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchUserName = async () => {
      if (id) {
        const firestore = getFirestore()
        const userDocRef = doc(firestore, 'users', id)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists() && userDoc.data()?.name) {
          setUserName(userDoc.data().name)
        }
      }
    }

    fetchUserName()
  }, [id])

  return (
    <section className={styles.singleHero}>
      <Parallax
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
              {userName && <h1>{userName}</h1>}
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
