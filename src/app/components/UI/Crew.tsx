'use client'

import { Card, Image, CardFooter, CardBody } from '@nextui-org/react'
import { useSelector } from '@/redux/store'
import { selectMovie } from '@/redux/slices/movieSlice'

interface CrewItem {
  id?: number
  name?: string
  department?: string
  profile_path?: string
  job?: string
}

const Crew = () => {
  const movie = useSelector(selectMovie)
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  return (
    <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-7 lg:text-left gap-4 m-auto">
      {movie &&
        movie.crew &&
        movie.crew.map((member: CrewItem, index: number) => (
          <Card shadow="md" key={index} className=" bg-cyan-100">
            <CardBody className="overflow-visible p-0 flex-none">
              <Image
                shadow="sm"
                radius="md"
                width="100%"
                className="w-full object-cover rounded-b-none"
                src={
                  member.profile_path
                    ? `${BASE_IMAGE_URL}w300/${member.profile_path}`
                    : NO_IMAGE
                }
                alt={member.name || 'Unknown'}
              />
            </CardBody>
            <CardFooter className="flex flex-col text-small items-start">
              <b>{member.name}</b>
              <p className="text-default-500">{member.department}</p>
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default Crew
