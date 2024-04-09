import { Chip } from '@nextui-org/react'
import { ItemsList } from '@/types/data'

type Props = {
  items: ItemsList[]
  keyName: keyof ItemsList
}

const ListRenderer: React.FC<Props> = ({ items, keyName = 'name' }) => {
  return (
    <>
      {items &&
        items.map((item, index) => (
          <Chip
            size="sm"
            radius="sm"
            key={item.id || index}
            className="text-black bg-gray-300 border-default-400/10 border-1"
          >
            {item[keyName]}
          </Chip>
        ))}
    </>
  )
}

export default ListRenderer
