'use client'

import Slider from 'react-slick'
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'
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
        color="primary"
        size="md"
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
        color="primary"
        size="md"
        className="absolute bottom-0 left-[86px] text-2xl text-dark"
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
            <Card shadow="md" key={index} className=" bg-cyan-100">
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="md"
                  width="100%"
                  className="w-full object-cover rounded-b-none"
                  src={
                    actor.profile_path
                      ? `${BASE_IMAGE_URL}w300/${actor.profile_path}`
                      : NO_IMAGE
                  }
                  alt={actor.name || 'Unknown'}
                />
              </CardBody>
              <CardFooter className="flex flex-col text-small items-start p-2">
                <b className="text-[15px]">{actor.name}</b>
                <p className="text-default-500 text-[14px]">
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
