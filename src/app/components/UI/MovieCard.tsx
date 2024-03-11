import { Card, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import formatReleaseDate from '@/utils/formatReleaseDate'
import MovieData from '@/types/movieData'
const NO_IMAGE = '/no-image.svg'

export default function MovieCard({
  id,
  title,
  image,
  release_date,
  vote_average,
}: MovieData) {
  const formattedReleaseDate = formatReleaseDate(release_date)
  const router = useRouter()
  const locale = useLocale()

  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-none bg-content-none bg-blueDark"
      onPress={() => {
        router.push(`${locale}/movie/${id}`)
      }}
    >
      <Image
        className="object-cover"
        src={image}
        width={220}
        height={330}
        fallbackSrc={NO_IMAGE}
        alt={title}
      />
      <CardFooter className="p-3 py-1 h-auto flex flex-col items-start color-inherit subpixel-antialiased bg-background/10 backdrop-blur-[2px] backdrop-saturate-100 backdrop-contrast-125 before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="text-white/80 text-[14px] text-shadow-sm pr-8">
          {title}
        </div>
        <div className="text-tiny text-white/80 text-shadow-sm">
          {formattedReleaseDate}
        </div>
        {vote_average ? <VoteAverage vote={vote_average} /> : <VoteDisabled />}
      </CardFooter>
    </Card>
  )
}
