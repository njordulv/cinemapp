import { Card, CardFooter, Image } from '@nextui-org/react'
import VoteAverage from '@/components/UI/VoteAverage'

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path?: string
  image?: string
  vote_average?: number
}

export default function MovieCard({
  title,
  image,
  release_date,
  vote_average,
}: Movie) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image alt={title} className="object-cover" src={image} width={500} />
      <CardFooter className="p-3 h-auto flex flex-col items-start color-inherit subpixel-antialiased bg-background/10 backdrop-blur-[2px] backdrop-saturate-100 backdrop-contrast-125 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="text-white/80 text-[14px] text-shadow-sm pr-8">
          {title}
        </div>
        <div className="text-white/80 text-[13px] text-shadow-sm">
          {release_date}
        </div>
        {vote_average && <VoteAverage vote={vote_average} />}
      </CardFooter>
    </Card>
  )
}
