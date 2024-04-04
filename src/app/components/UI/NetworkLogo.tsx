import { Image, Chip, Tooltip } from '@nextui-org/react'
import { NetworkTypes } from '@/types/data'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL

type Props = {
  items: NetworkTypes[]
}

const NetworkLogo: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index: number) => (
        <Tooltip
          key={index}
          placement="bottom"
          showArrow={true}
          content={item.name}
        >
          <Chip size="lg" radius="sm" className="text-black bg-gray-300 px-2">
            {item.logo_path !== null ? (
              <Image
                shadow="none"
                radius="none"
                className="object-cover max-h-6"
                src={
                  item.logo_path
                    ? `${BASE_IMAGE_URL}w300${item.logo_path}`
                    : '/no-image-237x133.svg'
                }
                width="auto"
                height="50px"
                fallbackSrc={'/no-image-237x133.svg'}
                alt={item.name}
              />
            ) : (
              item.name
            )}
          </Chip>
        </Tooltip>
      ))}
    </>
  )
}

export default NetworkLogo
