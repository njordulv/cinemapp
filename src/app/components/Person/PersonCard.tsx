import { useRouter } from 'next/navigation'
import { Card, Image } from '@nextui-org/react'
import { Person } from '@/types/data'
import KnownFor from '@/components/UI/KnownFor'
import styles from '@/styles/mainCard.module.scss'

type UserProps = {
  person: Person
  type: string
  category: string
}

export default function PersonCard({ person, type }: UserProps) {
  const router = useRouter()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  const pageHandler = () => {
    const basePath = `/${type}/${person.id}`
    router.push(basePath)
  }

  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      shadow="none"
      className={`${styles.card} bg-transparent`}
      onPress={pageHandler}
      aria-label={person.name}
    >
      <Image
        src={
          person.profile_path
            ? `${BASE_IMAGE_URL}w300${person.profile_path}`
            : NO_IMAGE
        }
        alt={person.name}
        width={288}
        height={432}
        className="object-cover"
        fallbackSrc={NO_IMAGE}
      />
      <div className="flex-col px-2 pt-2 w-full text-left">
        <div className={styles.card__title}>{person.name}</div>
        {person.known_for && <KnownFor items={person.known_for} />}
      </div>
    </Card>
  )
}
