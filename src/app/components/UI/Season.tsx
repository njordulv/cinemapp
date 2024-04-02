'use client'

import { useRouter } from 'next/navigation'
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'
import { Seasons } from '@/types/data'
import { formatReleaseYear } from '@/utils/formatDate'

interface SeasonProps {
  seasons: Seasons[]
  id: string
}

const Season: React.FC<SeasonProps> = ({ id, seasons }) => {
  const router = useRouter()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return seasons.slice(0, 5).map((season: Seasons, index: number) => (
    <Card
      isPressable
      shadow="md"
      key={season.id || index}
      className="bg-grey max-w-[154px]"
      onPress={() => router.push(`/tv/${id}/season/${season.season_number}`)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="md"
          width="100%"
          className="w-full object-cover rounded-b-none"
          src={
            season.poster_path
              ? `${BASE_IMAGE_URL}w300${season.poster_path}`
              : NO_IMAGE
          }
          alt={season.name || 'Unknown'}
        />
      </CardBody>
      <CardFooter className="flex flex-col text-small items-stretch p-2">
        <b className="text-[15px] text-left">{season.name}</b>
        <div className="flex justify-between gap-2">
          <span className="text-[14px] leading-[18px] text-left">
            {season.episode_count} Episodes
          </span>
          <span className="text-[14px] leading-[18px] text-right">
            {formatReleaseYear(season.air_date)}
          </span>
        </div>
      </CardFooter>
    </Card>
  ))
}

export default Season
