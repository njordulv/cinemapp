'use client'

import { useRouter } from 'next/navigation'
import {
  ScrollShadow,
  Card,
  Image,
  CardBody,
  CardFooter,
} from '@nextui-org/react'
import '@/styles/slick.scss'
import '@/styles/slick-theme.scss'

interface CastList {
  id?: number
  name?: string
  character?: string
  profile_path?: string
}

interface CastProps {
  cast: CastList[]
}

const Cast: React.FC<CastProps> = ({ cast }: CastProps) => {
  const router = useRouter()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <ScrollShadow orientation="horizontal" className="w-full">
      <div className="flex w-max space-x-3 pb-3">
        {cast &&
          cast.map((actor: CastList, index: number) => (
            <Card
              isPressable
              shadow="md"
              radius="md"
              key={index}
              className="bg-grey max-w-[149px]"
              onPress={() => router.push(`/person/${actor.id}`)}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="md"
                  width="100%"
                  height={223}
                  className="w-full object-cover rounded-b-none"
                  src={
                    actor.profile_path
                      ? `${BASE_IMAGE_URL}w300${actor.profile_path}`
                      : NO_IMAGE
                  }
                  alt={actor.name || 'Unknown'}
                />
              </CardBody>
              <CardFooter className="flex flex-col text-small items-start p-2">
                <b className="text-[15px] text-left">{actor.name}</b>
                <p className="text-[14px] text-left leading-[18px]">
                  {actor.character}
                </p>
              </CardFooter>
            </Card>
          ))}
      </div>
    </ScrollShadow>
  )
}

export default Cast
