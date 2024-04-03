import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { CardTypes } from '@/types/data'
import KnownFor from '@/components/UI/KnownFor'

const PersonCard: React.FC<CardTypes> = ({
  id,
  type,
  image,
  name,
  vote_average,
  known_for,
}: CardTypes) => {
  const router = useRouter()
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  const pageHandler = () => {
    const basePath = `/${type}/${id}`
    router.push(basePath)
  }

  return (
    <Card shadow="md" isPressable onPress={pageHandler}>
      <CardBody className="overflow-visible p-0 flex-none">
        <Image
          shadow="sm"
          radius="md"
          width="182"
          className="w-full object-cover h-[240px] rounded-b-none"
          src={image ? `${BASE_IMAGE_URL}w300${image}` : NO_IMAGE}
          fallbackSrc={NO_IMAGE}
          alt={name || 'Unknown'}
        />
      </CardBody>
      <CardFooter className="flex flex-col text-small items-start gap-2 p-2">
        <b className="text-[15px]">{name}</b>
        <p>{vote_average}</p>
        {/* {known_for && <KnownFor items={known_for} />} */}
      </CardFooter>
    </Card>
  )
}

export default PersonCard
