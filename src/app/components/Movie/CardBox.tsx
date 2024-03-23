import useFetcher from '@/hooks/useFetcher'
import { Movie } from '@/types/data'
import MainCard from '@/components/UI/MainCard'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'

export default function CardBox({
  id,
  title,
  image,
  release_date,
  vote_average,
}: Movie) {
  const { data, isLoading, isError } = useFetcher({
    endpoint: `api/movies?endpoint=movie/${id}&combinedEndpoints=movie/${id}/credits`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />

  return (
    <>
      <MainCard
        type={'movie'}
        id={id}
        image={image}
        name={title}
        date={release_date}
        vote_average={vote_average}
      />
    </>
  )
}
