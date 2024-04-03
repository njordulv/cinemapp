'use client'

import Link from 'next/link'
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
              shadow="none"
              radius="md"
              key={index}
              className="max-w-[154px] bg-transparent"
              onPress={() => router.push(`/person/${actor.id}`)}
            >
              <CardBody className="overflow-visible p-0 flex-none">
                <Image
                  shadow="none"
                  radius="lg"
                  width="100%"
                  height={223}
                  className="w-full object-cover"
                  src={
                    actor.profile_path
                      ? `${BASE_IMAGE_URL}w300${actor.profile_path}`
                      : NO_IMAGE
                  }
                  alt={actor.name || 'Unknown'}
                />
              </CardBody>
              <CardFooter className="flex flex-col text-small items-start px-2">
                <Link
                  href={`/person/${actor.id}`}
                  className="text-[15px] text-left text-white font-normal hover:text-red"
                >
                  {actor.name}
                </Link>
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
