'use client'

import { useSelector } from '@/redux/store'
import { selectMovie } from '@/redux/slices/movieSlice'
import { Card, Image, CardFooter } from '@nextui-org/react'

interface CastItem {
  id?: number
  name?: string
  character?: string
  profile_path?: string
}

interface Movie {
  title: string
  cast?: CastItem[]
}

const Cast = () => {
  const movie = useSelector(selectMovie)
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  if (!movie) {
    return <div>No movie selected</div>
  }

  return (
    <>
      {movie.cast && movie.cast.length > 0 && (
        <>
          <h3>Cast:</h3>
          <div className="grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-8 lg:text-left gap-4 m-auto">
            {movie.cast.map((actor: CastItem, index: number) => (
              <Card
                isFooterBlurred
                isPressable
                radius="sm"
                className="border-none bg-content-none bg-blueDark"
                key={actor.id || index}
              >
                <Image
                  shadow="md"
                  radius="sm"
                  className="object-cover"
                  src={
                    actor.profile_path
                      ? `${BASE_IMAGE_URL}w300/${actor.profile_path}`
                      : NO_IMAGE
                  }
                  width={138}
                  height={175}
                  fallbackSrc={NO_IMAGE}
                  alt={actor.name || 'Unknown'}
                />
                <CardFooter className="flex flex-col items-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-md rounded-md bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80 font-bold">
                    {actor.name}
                  </p>
                  <p className="text-tiny text-white/80 text-left">
                    {actor.character}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Cast
