import { Chip } from '@nextui-org/react'

type ListItem = {
  id?: number
  name?: string
  english_name?: string
}

type Props = {
  items: ListItem[]
  keyName: keyof ListItem
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
