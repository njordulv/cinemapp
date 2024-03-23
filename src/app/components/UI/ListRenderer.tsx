import { Chip } from '@nextui-org/react'
import { ItemsList } from '@/types/data'

type Props = {
  items: ItemsList[]
  keyName: keyof ItemsList
}

const ListRenderer: React.FC<Props> = ({ items, keyName = 'name' }) => {
  return (
    <>
      {items.map((item, index) => (
        <Chip size="sm" key={item.id || index}>
          {item[keyName]}
        </Chip>
      ))}
    </>
  )
}

export default ListRenderer
