import { useState, useEffect } from 'react'
import { Card, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from '@/redux/store'
import { setTopRated } from '@/redux/slices/topRatedSlice'
import { formatReleaseDate } from '@/utils/formatDate'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import TopRatedData from '@/types/TopRatedData'
const NO_IMAGE = '/no-image.svg'

export default function CardBox({
  id,
  title,
  image,
  release_date,
  vote_average,
}: TopRatedData) {
  const dispatch = useDispatch()
  const router = useRouter()
  const formattedReleaseDate = formatReleaseDate(release_date)
  const [error, setError] = useState<string | null>(null)
  const [topRatedDetails, setTopRatedDetails] = useState(null)

  useEffect(() => {
    fetch(`/api/top_rated/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => {
        setTopRatedDetails(data)
      })
      .catch((error) => setError(error.message))
  }, [id, dispatch])

  const pageHandler = () => {
    dispatch(setTopRated(topRatedDetails))
    router.push(`/movie/${id}`)
  }

  if (error) {
    return <div>There is an error - {error}</div>
  }

  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-none bg-content-none bg-blueDark"
      onPress={pageHandler}
    >
      <Image
        className="object-cover"
        src={image}
        width={220}
        height={330}
        fallbackSrc={NO_IMAGE}
        alt={title}
      />
      <CardFooter className="p-3 py-1 h-auto flex flex-col items-start text-left color-inherit subpixel-antialiased bg-background/10 backdrop-blur-[2px] backdrop-saturate-100 backdrop-contrast-125 before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="text-white text-[14px] leading-[18px] text-shadow-sm pr-8">
          {title}
        </div>
        <div className="text-tiny text-white/80 text-shadow-sm">
          {formattedReleaseDate}
        </div>
        <div className="absolute top-[50%] right-[3px] mt-[-20px]">
          {vote_average ? (
            <VoteAverage
              vote={vote_average}
              card="w-[40px] h-[40px]"
              size="w-8 h-8 drop-shadow-md"
              strokeWidth={2}
              text="text-[12px]"
            />
          ) : (
            <VoteDisabled
              card="w-[40px] h-[40px]"
              size="w-8 h-8 drop-shadow-md"
              strokeWidth={2}
              text="text-[12px] top-[-3px] relative"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
