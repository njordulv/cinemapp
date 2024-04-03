import { Image, Chip } from '@nextui-org/react'
import { NetworkTypes } from '@/types/data'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

type Props = {
  items: NetworkTypes[]
}

const NetworkLogo: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Chip size="lg" radius="md" className="bg-white/90">
          <Image
            key={item.id || index}
            shadow="none"
            radius="none"
            className="object-cover max-h-[20px]"
            src={
              item.logo_path
                ? `${BASE_IMAGE_URL}w300${item.logo_path}`
                : NO_IMAGE
            }
            width="auto"
            height="50px"
            fallbackSrc={NO_IMAGE}
            alt={item.name}
          />
        </Chip>
      ))}
    </>
  )
}

export default NetworkLogo
