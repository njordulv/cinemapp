import { Card, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import { formatReleaseDate } from '@/utils/formatDate'

interface Props {
  id: number | string
  type: string
  image: string | undefined
  name: string
  date: string
  vote_average: number | undefined
  seasonNumber?: number
}

const MainCard: React.FC<Props> = ({
  id,
  type,
  image,
  name,
  date,
  vote_average,
  seasonNumber,
}: Props) => {
  const router = useRouter()
  const formattedReleaseDate = formatReleaseDate(date)
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  const pageHandler = () => {
    const basePath = `/${type}/${id}`
    const fullPath =
      type === 'tv' && seasonNumber !== undefined
        ? `${basePath}/season/${seasonNumber}`
        : basePath
    router.push(fullPath)
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
        src={image ? `${BASE_IMAGE_URL}w300/${image}` : NO_IMAGE}
        alt={name || 'Unknown'}
        width={220}
        height={330}
        fallbackSrc={NO_IMAGE}
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

export default MainCard
