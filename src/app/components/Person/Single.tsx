'use client'

import useFetcher from '@/hooks/useFetcher'
import { Image, Link, Spacer } from '@nextui-org/react'
import { LiaImdb } from 'react-icons/lia'
import { formatReleaseDate } from '@/utils/formatDate'
import calculateAge from '@/utils/calculateAge'
import FamousWorks from '@/components/Person/FamousWorks'
import AllMovies from '@/components/Person/AllMovies'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'
import styles from '@/styles/singlePerson.module.scss'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL

export default function Single({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=person/${params.id}&combinedEndpoints=person/${params.id}/combined_credits`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  const {
    name,
    biography,
    birthday,
    deathday,
    homepage,
    imdb_id,
    known_for_department,
    place_of_birth,
    profile_path,
    popularity,
  } = data

  return (
    <>
      <div className={styles.person__container}>
        <div className={styles.person__details}>
          <div className={styles.person__info}>
            {profile_path && (
              <>
                <Image
                  shadow="md"
                  className={styles.person__image}
                  src={
                    profile_path
                      ? `${BASE_IMAGE_URL}w300${profile_path}`
                      : '/no-image-300x450.svg'
                  }
                  width={300}
                  height={450}
                  fallbackSrc={'/no-image-300x450.svg'}
                  alt={name}
                />
                <Spacer x={4} />
              </>
            )}
            {name && (
              <h1 className={`${styles.person__name} md:hidden`}>{name}</h1>
            )}
            {birthday && (
              <div className={styles.person__detail}>
                <b>Birthday:</b>
                <div>
                  {formatReleaseDate(birthday)} (
                  {calculateAge({
                    birthdayType: birthday,
                    deathdayType: deathday,
                  })}
                  years old)
                </div>
              </div>
            )}
            {place_of_birth && (
              <div className={styles.person__detail}>
                <b>Place of Birth:</b>
                <div>{place_of_birth}</div>
              </div>
            )}
            {deathday && (
              <div className={styles.person__detail}>
                <b>Day of Death:</b>
                {formatReleaseDate(deathday)}
              </div>
            )}
            {known_for_department && (
              <div className={styles.person__detail}>
                <b>Known For:</b>
                <div>{known_for_department}</div>
              </div>
            )}
            {popularity && (
              <div className={styles.person__detail}>
                <b>Popularity:</b>
                <div>{popularity.toFixed(0)}</div>
              </div>
            )}
            {homepage && (
              <div className={styles.person__detail}>
                <b>Wesite:</b>
                <Link
                  isBlock
                  isExternal
                  color="foreground"
                  href={homepage}
                  className="text-white hover:text-soft p-0"
                >
                  {name}
                </Link>
              </div>
            )}
            {imdb_id && (
              <div className={styles.person__detail}>
                <b>IMBd:</b>
                <Link
                  isBlock
                  isExternal
                  color="foreground"
                  href={`https://www.imdb.com/name/${imdb_id}`}
                  className="text-white hover:text-soft p-0"
                >
                  <LiaImdb size={28} />
                </Link>
              </div>
            )}
          </div>
          <div className={styles.person__info}>
            {name && (
              <h1 className={`${styles.person__name} hidden md:flex`}>
                {name}
              </h1>
            )}
            {biography && (
              <div className={styles.person__detail}>
                <div>{biography}</div>
              </div>
            )}
            {data.combined_credits && (
              <FamousWorks
                data={data.combined_credits}
                knownFor={known_for_department}
              />
            )}
          </div>
        </div>
        {data.combined_credits && (
          <AllMovies
            data={data.combined_credits}
            knownFor={known_for_department}
          />
        )}
      </div>
    </>
  )
}
