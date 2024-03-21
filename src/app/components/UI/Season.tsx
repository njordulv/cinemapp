'use client'

import { useRouter } from 'next/navigation'
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'
import SeasonsData from '@/types/SeasonsData'

interface SeasonProps {
  seasons: SeasonsData[]
  id: string
}

const Season: React.FC<SeasonProps> = ({ id, seasons }) => {
  const router = useRouter()
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  return seasons.slice(0, 5).map((season: SeasonsData, index: number) => (
    <Card
      isPressable
      shadow="md"
      key={season.id || index}
      className="bg-grey"
      onPress={() => router.push(`/tv/${id}/seasons/${season.season_number}`)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="md"
          width="100%"
          className="w-full object-cover rounded-b-none"
          src={
            season.poster_path
              ? `${BASE_IMAGE_URL}w300/${season.poster_path}`
              : NO_IMAGE
          }
          alt={season.name || 'Unknown'}
        />
      </CardBody>
      <CardFooter className="flex flex-col text-small items-start p-2">
        <b className="text-[15px] text-left">{season.name}</b>
        <p className="text-[14px] text-left leading-[18px]">
          {season.episode_count} Episodes
        </p>
      </CardFooter>
    </Card>
  ))
}

export default Season
