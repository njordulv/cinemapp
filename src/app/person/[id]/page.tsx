'use client'

import { Image, Link } from '@nextui-org/react'
import { LiaImdb } from 'react-icons/lia'
import useFetcher from '@/hooks/useFetcher'
import { formatReleaseDate } from '@/utils/formatDate'
import calculateAge from '@/utils/calculateAge'
import AllMovies from '@/components/Person/AllMovies'
import Error from '@/components/UI/Error'
import Loader from '@/components/UI/Loader'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
const NO_IMAGE = '/no-image.svg'

export default function Post({ params }: { params: { id: string } }) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=person/${params.id}`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  const {
    id,
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
        <div>
          <AllMovies id={id} />
        </div>
      </div>
    </>
  )
}
