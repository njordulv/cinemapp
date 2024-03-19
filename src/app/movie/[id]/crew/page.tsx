'use client'
import { useEffect, useState } from 'react'
import { Card, Image, CardFooter, CardBody } from '@nextui-org/react'

interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: number
  department: string
  job: string
}

export default function Crew({ params }: { params: { id: string } }) {
  const [crewData, setCrewData] = useState<Crew[]>([])
  const [error, setError] = useState('')
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  useEffect(() => {
    const { id } = params

    fetch(
      `/api/movies?endpoint=movie/${id}&combinedEndpoints=movie/${id}/credits`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie data')
        }
        return response.json()
      })
      .then((data) => {
        setCrewData(data.credits.crew)
      })

      .catch((error) => setError(error.message))
  }, [params.id])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <main className="flex flex-col items-center place-content-center min-h-96 w-full max-w-[1170px] m-auto px-6 py-10">
      <h1 className="flex self-start font-medium mb-6 text-4xl">Crew:</h1>
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-7 lg:text-left gap-4 m-auto">
        {crewData.map((member: Crew, index: number) => (
          <Card shadow="md" key={index} className=" bg-grey">
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
    </main>
  )
}
