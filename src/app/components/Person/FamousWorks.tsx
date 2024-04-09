import {
  ScrollShadow,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { PersonMoviesTypes } from '@/types/data'
import { getDepartmentData } from '@/utils/getDepartmentData'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL

interface Props {
  data: {
    cast: PersonMoviesTypes[]
    crew: PersonMoviesTypes[]
  }
  knownFor: string
}

const FamousWorks: React.FC<Props> = ({ data, knownFor }) => {
  const router = useRouter()
  const departmentData = getDepartmentData(data, knownFor)

  const sortedAll = [...departmentData].sort(
    (a, b) => b.vote_count - a.vote_count
  )

  const removeDuplicates = sortedAll.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.id === value.id && t.name === value.name)
  )

  const popularMovies = removeDuplicates
    .filter((item) => item.media_type === 'movie')
    .slice(0, 8)
  const popularTVShows = removeDuplicates
    .filter((item) => item.media_type === 'tv')
    .slice(0, 8)

  const sortedByPopularity =
    popularMovies.length > 0 ? popularMovies : popularTVShows

  return (
    <>
      {data && (data.cast?.length ?? 0) > 0 && (
        <>
          <h2 className="flex py-2 px-3 mt-5 mb-0 w-full font-medium text-[17px] leading-6 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent dark:bg-transparent shadow-sm rounded-medium border-default-200 border-1">
            Known for
          </h2>
          <ScrollShadow orientation="horizontal" className="w-full">
            <div className="flex w-max space-x-3">
              {sortedByPopularity.map((item: PersonMoviesTypes) => (
                <Card
                  shadow="none"
                  radius="md"
                  key={item.credit_id}
                  isPressable
                  className="bg-transparent max-w-[120px] self-start"
                  onPress={() =>
                    router.push(
                      `${item.media_type === 'movie' ? '/movie/' : '/tv/'}${
                        item.id
                      }`
                    )
                  }
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="none"
                      radius="lg"
                      width="100%"
                      height="auto"
                      className="object-cover"
                      alt={item.title}
                      src={
                        item.poster_path
                          ? `${BASE_IMAGE_URL}w154${item.poster_path}`
                          : '/no-image-120x180.svg'
                      }
                      fallbackSrc={'/no-image-120x180.svg'}
                    />
                  </CardBody>
                  <CardFooter className="text-small items-center justify-center px-1">
                    <p className="text-sm leading-5">{item.title}</p>
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

export default FamousWorks
