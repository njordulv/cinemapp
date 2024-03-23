'use client'

import Slider from 'react-slick'
import { useRouter } from 'next/navigation'
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { CustomButton } from '@/components/UI/CustomButton'
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

interface ArrowProps {
  onClick: () => void
}

const Cast: React.FC<CastProps> = ({ cast }: CastProps) => {
  const router = useRouter()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  function PrevArrow(props: ArrowProps) {
    const { onClick } = props
    return (
      <CustomButton
        color="primary"
        size="md"
        className="absolute bottom-0 left-[10px] z-10 text-2xl text-white"
        onClick={onClick}
      >
        <GoChevronLeft />
      </CustomButton>
    )
  }

  function NextArrow(props: ArrowProps) {
    const { onClick } = props
    return (
      <CustomButton
        color="primary"
        size="md"
        className="absolute bottom-0 left-[86px] text-2xl text-white"
        onClick={onClick}
      >
        <GoChevronRight />
      </CustomButton>
    )
  }

  const settings = {
    centerMode: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    speed: 700,
    autoplay: false,
    pauseOnHover: false,
    nav: true,
    dots: false,
    arrows: true,
    swipeToSlide: true,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 640,
        settings: {},
      },
      {
        breakpoint: 480,
        settings: {},
      },
    ],
  }

  return (
    <Slider {...settings}>
      {cast &&
        cast.map((actor: CastList, index: number) => (
          <div className="slide-item" key={actor.id || index}>
            <div className="slide-inner">
              <Card
                isPressable
                shadow="md"
                key={index}
                className="bg-grey"
                onPress={() => router.push(`/person/${actor.id}`)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="md"
                    width="100%"
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
            </div>
          </div>
        ))}
    </Slider>
  )
}

export default Cast
