import { Card, CardFooter, Image } from '@nextui-org/react'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import formatReleaseDate from '@/utils/formatReleaseDate'
import MovieData from '@/types/movieData'

export default function MovieCard({
  title,
  image,
  release_date,
  vote_average,
}: MovieData) {
  const formattedReleaseDate = formatReleaseDate(release_date)

  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-none bg-content-none"
    >
      <Image className="object-cover h-[331px]" src={image} alt={title} />
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
