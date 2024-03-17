import { useState, useEffect } from 'react'
import { Card, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from '@/redux/store'
import { setTV } from '@/redux/slices/tvSlice'
import { formatReleaseDate } from '@/utils/formatDate'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import TVData from '@/types/TVData'
const NO_IMAGE = '/no-image.svg'

export default function TVCard({
  id,
  name,
  image,
  first_air_date,
  vote_average,
}: TVData) {
  const dispatch = useDispatch()
  const router = useRouter()
  const formattedReleaseDate = formatReleaseDate(first_air_date)
  const [error, setError] = useState<string | null>(null)
  const [tvDetails, setTVDetails] = useState(null)

  useEffect(() => {
    fetch(`api/movies?endpoint=tv/${id}&combinedEndpoints=tv/credits`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => {
        setTVDetails(data)
      })
      .catch((error) => setError(error.message))
  }, [id, dispatch])

  const pageHandler = () => {
    dispatch(setTV(tvDetails))
    router.push(`/tv/${id}`)
  }

  if (error) {
    return <h1>There is an error - {error}</h1>
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
        alt={name}
      />
      <CardFooter className="p-3 py-1 h-auto flex flex-col items-start text-left color-inherit subpixel-antialiased bg-background/10 backdrop-blur-[2px] backdrop-saturate-100 backdrop-contrast-125 before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="text-white/80 text-[14px] leading-[18px] text-shadow-sm pr-8">
          {name}
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
