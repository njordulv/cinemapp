import { TopRated } from '@/types/data'
import MainCard from '@/components/UI/MainCard'

export default function CardBox({
  id,
  title,
  image,
  release_date,
  vote_average,
}: TopRated) {
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
