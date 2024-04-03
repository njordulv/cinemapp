import { Person } from '@/types/data'
interface Props {
  items: Person['known_for']
}

const KnownFor: React.FC<Props> = ({ items }) => (
  <div className="flex items-start gap-1 flex-wrap">
    {items.map((item, index: number) => (
      <span key={index} className="text-white">
        {item?.name}
        {item?.title}
        {index > 0 && ', '}
      </span>
    ))}
  </div>
)

export default KnownFor
