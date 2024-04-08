import { Link } from '@nextui-org/react'
import { Person } from '@/types/data'
interface Props {
  items: Person['known_for']
}

const KnownFor: React.FC<Props> = ({ items }) => (
  <div className="flex items-start gap-1 flex-wrap mt-2 contents=[s]">
    {items.map((item, index: number) => (
      <Link
        key={index}
        href={`/movie/${item.id}`}
        className="text-tiny text-white bg-gray-600 py-1 px-2 rounded-xl"
      >
        {item?.title}
        {item?.name}
      </Link>
    ))}
  </div>
)

export default KnownFor
