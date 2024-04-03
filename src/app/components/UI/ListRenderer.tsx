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
            className="bg-black bg-opacity-80"
          >
            {item[keyName]}
          </Chip>
        ))}
    </>
  )
}

export default ListRenderer
