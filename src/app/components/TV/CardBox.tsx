import { Movie } from '@/types/data'
import MainCard from '@/components/UI/MainCard'

export default function CardBox({
  id,
  name,
  image,
  first_air_date,
  vote_average,
}: Movie) {
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
