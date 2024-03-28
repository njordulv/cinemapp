import { Card, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { CardTypes } from '@/types/data'
import { formatReleaseDate } from '@/utils/formatDate'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import styles from '@/styles/mainCard.module.scss'

const MainCard: React.FC<CardTypes> = ({
  id,
  type,
  image,
  title,
  name,
  date,
  dateAir,
  vote_average,
  seasonNumber,
}: CardTypes) => {
  const router = useRouter()
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
      className={styles.card}
      onPress={pageHandler}
      aria-label={`${type === 'movie' ? title : name}`}
    >
      <Image
        className={styles.card__image}
        src={image ? `${BASE_IMAGE_URL}w300${image}` : NO_IMAGE}
        alt={type === 'movie' ? title ?? 'Unknown' : name ?? 'Unknown'}
        width={220}
        height={330}
        fallbackSrc={NO_IMAGE}
      />
      <CardFooter className={styles.card__footer}>
        <div className={styles.card__title}>
          {type === 'movie' ? title : name}
        </div>
        <div className={styles.card__date}>
          {formatReleaseDate(type === 'movie' ? date ?? '' : dateAir ?? '')}
        </div>
        <div className={styles.card__vote}>
          {vote_average ? (
            <VoteAverage
              vote={vote_average}
              card={styles.card__voteCard}
              size={styles.card__voteSize}
              strokeWidth={2}
              text="text-[12px]"
            />
          ) : (
            <VoteDisabled
              card={styles.card__voteCard}
              size={styles.card__voteSize}
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
