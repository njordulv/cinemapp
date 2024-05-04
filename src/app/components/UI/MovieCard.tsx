import { useRouter } from 'next/navigation'
import { Card, Image } from '@nextui-org/react'
import { Movie } from '@/types/data'
import { formatReleaseDate } from '@/utils/formatDate'
import { useAuth } from '@/hooks/useAuth'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import WatchlistBtn from '@/components/User/WatchlistBtn'
import styles from '@/styles/mainCard.module.scss'

interface UserProps {
  movie: Movie
  type: string
  category: string
}

export default function MovieCard({ movie, type }: UserProps) {
  const router = useRouter()
  const { isAuth } = useAuth()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  const pageHandler = () => {
    const basePath = `/${type}/${movie.id}`
    router.push(basePath)
  }

  return (
    <div className={styles.card}>
      {isAuth && <WatchlistBtn movie={movie} />}
      <Card
        isPressable
        radius="lg"
        shadow="none"
        className={styles.card__item}
        onPress={pageHandler}
        aria-label={`${movie.title || movie.name}`}
      >
        <Image
          src={
            movie.poster_path
              ? `${BASE_IMAGE_URL}w300${movie.poster_path}`
              : NO_IMAGE
          }
          alt={movie.title || movie.name}
          width={288}
          height={432}
          className="object-cover"
          fallbackSrc={NO_IMAGE}
        />
        <div className={styles.card__footer}>
          <div>
            <div className={styles.card__title}>
              {movie.title || movie.name}
            </div>
            <div className={styles.card__date}>
              {formatReleaseDate(movie.release_date || movie.first_air_date)}
            </div>
          </div>
          <div className={styles.card__vote}>
            {movie.vote_average ? (
              <VoteAverage
                vote={movie.vote_average}
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
        </div>
      </Card>
    </div>
  )
}
