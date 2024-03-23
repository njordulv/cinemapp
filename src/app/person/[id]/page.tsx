'use client'

import { useEffect, useState } from 'react'
import { Image, Link } from '@nextui-org/react'
import { LiaImdb } from 'react-icons/lia'
import { formatReleaseDate } from '@/utils/formatDate'
import PersonData from '@/types/PersonData'
import calculateAge from '@/utils/calculateAge'
import Loading from '@/src/app/loading'

export default function Post({ params }: { params: { id: string } }) {
  const [personData, setPersonData] = useState<PersonData | null>(null)
  const [error, setError] = useState('')
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  useEffect(() => {
    const { id } = params

    fetch(`/api/movies?endpoint=person/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie data')
        }
        return response.json()
      })
      .then((data) => {
        setPersonData(data)
      })

      .catch((error) => setError(error.message))
  }, [params.id])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!personData) {
    return <Loading />
  }

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
  } = personData

  return (
    <>
      <div className="mb-32 grid lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left gap-4 m-auto py-20 px-6">
        <div className={`grid lg:grid-cols-[1fr_3fr] gap-10 items-start`}>
          <Image
            shadow="md"
            className="object-cover"
            src={
              profile_path ? `${BASE_IMAGE_URL}w300${profile_path}` : NO_IMAGE
            }
            width={300}
            height={450}
            fallbackSrc={NO_IMAGE}
            alt={name}
          />
          <div className="flex flex-col gap-3">
            <h1 className="flex self-start font-medium text-4xl mb-0">
              {name}
            </h1>
            {biography && (
              <div className="flex gap-1 items-center">
                <div>{biography}</div>
              </div>
            )}
            {birthday && (
              <div className="flex gap-1 items-center">
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
              <div className="flex gap-1 items-center">
                <b>Place of Birth:</b>
                <div>{place_of_birth}</div>
              </div>
            )}
            {deathday && (
              <div className="flex gap-1 items-center">
                <b>Day of Death:</b>
                {formatReleaseDate(deathday)}
              </div>
            )}
            {known_for_department && (
              <div className="flex gap-1 items-center">
                <b>Known For:</b>
                <div>{known_for_department}</div>
              </div>
            )}
            {popularity && (
              <div className="flex gap-1 items-center">
                <b>Popularity:</b>
                <div>{popularity.toFixed(0)}</div>
              </div>
            )}
            {homepage && (
              <div className="flex gap-1 items-center">
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
              <div className="flex gap-1 items-center">
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
        </div>
      </div>
    </>
  )
}
