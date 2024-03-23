import useFetcher from '@/hooks/useFetcher'
import { Movie } from '@/types/data'
import MainCard from '@/components/UI/MainCard'
import Loader from '@/components/UI/Loader'
import Error from '@/components/UI/Error'

export default function TVCard({
  id,
  name,
  image,
  first_air_date,
  vote_average,
}: Movie) {
  const { data, isLoading, isError } = useFetcher({
    endpoint: `api/movies?endpoint=tv/${id}&combinedEndpoints=tv/${id}/credits`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading) return <Loader />

  return (
    <>
      <MainCard
        type={'tv'}
        id={id}
        image={image}
        name={name}
        date={first_air_date}
        vote_average={vote_average}
      />
    </>
  )
}
