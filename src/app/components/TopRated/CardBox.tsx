import { TopRated } from '@/types/data'
import MainCard from '@/components/UI/MainCard'

export default function CardBox({
  id,
  type,
  title,
  name,
  image,
  release_date,
  first_air_date,
  vote_average,
}: TopRated) {
  return (
    <>
      <MainCard
        type={type}
        id={id}
        image={image}
        name={type === 'movie' ? title : name}
        date={type === 'movie' ? release_date : first_air_date}
        vote_average={vote_average}
      />
    </>
  )
}
