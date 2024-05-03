import {
  ScrollShadow,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { RecommendationsTypes } from '@/types/data'
import { formatReleaseYear } from '@/utils/formatDate'
import useFetcher from '@/hooks/useFetcher'
import Error from '@/components/UI/Error'
import Loader from '@/components/UI/Loader'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL

interface Props {
  id: string
  isMovie: boolean
}

const Recommendations: React.FC<Props> = ({ id, isMovie }: Props) => {
  const router = useRouter()
  const pageType = isMovie ? 'movie' : 'tv'
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=${pageType}/${id}/recommendations`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  return (
    <>
      {data && (data.results?.length ?? 0) > 0 && (
        <>
          <h2 className="flex py-2 px-3 my-5 font-medium text-[17px] leading-6 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-default-50 bg-opacity-20 shadow-sm rounded-medium border-default-200 border-1">
            Recommendations
          </h2>
          <ScrollShadow orientation="horizontal" className="w-full">
            <div className="flex w-max space-x-3">
              {data.results.map((item: RecommendationsTypes) => (
                <Card
                  shadow="none"
                  radius="md"
                  key={item.id}
                  isPressable
                  className="bg-transparent max-w-[237px] self-start"
                  onPress={() =>
                    router.push(`${isMovie ? '/movie/' : '/tv/'}${item.id}`)
                  }
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="none"
                      radius="lg"
                      width="100%"
                      height="auto"
                      className="object-cover"
                      alt={item.title || item.name}
                      src={
                        item.backdrop_path
                          ? `${BASE_IMAGE_URL}w300${item.backdrop_path}`
                          : '/no-image-237x133.svg'
                      }
                      fallbackSrc={'/no-image-237x133.svg'}
                    />
                  </CardBody>
                  <CardFooter className="items-center gap-2 text-left justify-between px-2 text-sm leading-5 font-normal">
                    <span>{item.title || item.name}</span>
                    <span className="text-default-400">
                      {formatReleaseYear(
                        isMovie
                          ? item.release_date ?? ''
                          : item.first_air_date ?? ''
                      )}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollShadow>
        </>
      )}
    </>
  )
}

export default Recommendations
