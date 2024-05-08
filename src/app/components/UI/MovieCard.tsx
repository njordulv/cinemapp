import { useRouter } from 'next/navigation'
import { Card, Image } from '@nextui-org/react'
import { Movie } from '@/types/data'
import { formatReleaseDate } from '@/utils/formatDate'
import VoteAverage from '@/components/UI/VoteAverage'
import VoteDisabled from '@/components/UI/VoteDisabled'
import ToggleWatchlist from '@/components/User/ToggleWatchlist'
import ToggleFavorites from '@/components/User/ToggleFavorites'
import styles from '@/styles/mainCard.module.scss'

interface UserProps {
  movie: Movie
  type: 'movie' | 'tv'
  category: string
}

export default function MovieCard({ movie, type }: UserProps) {
  const router = useRouter()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  const pageHandler = () => {
    router.push(`/${type}/${movie.id}`)
  }

  return (
    <div className={styles.card}>
      <div className="absolute right-1 top-1 z-20 flex flex-col gap-1">
        <ToggleWatchlist id={movie.id} type={type} />
        <ToggleFavorites id={movie.id} type={type} />
      </div>
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
