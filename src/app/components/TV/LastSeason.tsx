import { Card, Image, CardBody, Chip } from '@nextui-org/react'
import { IoStarSharp } from 'react-icons/io5'
import SeasonsData from '@/types/SeasonsData'
import getLastSeason from '@/utils/getLastSeason'
import { formatReleaseDate } from '@/utils/formatDate'

interface SeasonProps {
  seasons: SeasonsData[]
  id: string
}

export default function LastSeason({ seasons }: SeasonProps) {
  const lastSeason = getLastSeason(seasons)
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  return (
    <>
      <Card isBlurred className="border-none bg-grey" shadow="sm">
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-start justify-center">
            <div className="relative col-span-5 md:col-span-4">
              <Image
                className="object-cover"
                height={180}
                width="100%"
                shadow="md"
                src={
                  lastSeason?.poster_path
                    ? `${BASE_IMAGE_URL}w300/${lastSeason?.poster_path}`
                    : NO_IMAGE
                }
                alt={lastSeason?.name || 'Unknown'}
              />
            </div>

            <div className="flex flex-col col-span-7 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90 mb-2">
                    {lastSeason?.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Chip
                      startContent={<IoStarSharp size={16} />}
                      variant="flat"
                      className="bg-dark text-white"
                    >
                      {lastSeason?.vote_average ?? 'No rating'}
                    </Chip>
                    <p className="text-small font-normal">
                      {lastSeason?.air_date
                        ? formatReleaseDate(lastSeason.air_date)
                        : 'Unknown date'}
                    </p>
                  </div>
                  <p className="text-large font-normal mt-2">
                    {lastSeason?.episode_count} Episodes
                  </p>
                  <p className="text-medium font-normal mt-2">
                    {lastSeason?.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
