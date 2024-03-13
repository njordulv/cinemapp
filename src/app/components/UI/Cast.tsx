'use client'

import Slider from 'react-slick'
import { Card, Image, CardFooter } from '@nextui-org/react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { useSelector } from '@/redux/store'
import { selectMovie } from '@/redux/slices/movieSlice'
import { CustomButton } from '@/components/UI/CustomButton'
import '@/styles/slick.scss'
import '@/styles/slick-theme.scss'

interface CastItem {
  id?: number
  name?: string
  character?: string
  profile_path?: string
}

interface ArrowProps {
  onClick: () => void
}

const Cast = () => {
  const movie = useSelector(selectMovie)
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
  const NO_IMAGE = '/no-image.svg'

  if (!movie) {
    return <div>No movie selected</div>
  }

  function PrevArrow(props: ArrowProps) {
    const { onClick } = props
    return (
      <CustomButton
        color="blue"
        className="absolute bottom-0 left-[10px] z-10 text-2xl text-dark"
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
        color="blue"
        className="absolute bottom-0 left-[100px] text-2xl text-dark"
        onClick={onClick}
      >
        <GoChevronRight />
      </CustomButton>
    )
  }

  const settings = {
    centerMode: false,
    infinite: false,
    slidesToShow: 7,
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
      {movie.cast.map((actor: CastItem, index: number) => (
        <div className="slide-item" key={actor.id || index}>
          <div className="slide-inner">
            <Card
              isFooterBlurred
              radius="sm"
              className="border-none bg-content-none bg-blueDark"
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
                width={148}
                height={222}
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
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default Cast
