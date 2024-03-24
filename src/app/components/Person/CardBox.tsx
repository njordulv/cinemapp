import { CardTypes } from '@/types/data'
import PersonCard from '@/components/UI/PersonCard'

export default function CardBox({ id, name, image, known_for }: CardTypes) {
  return (
    <>
      <PersonCard
        id={id}
        type={'person'}
        image={image}
        name={name}
        known_for={known_for}
      />
    </>
  )
}
