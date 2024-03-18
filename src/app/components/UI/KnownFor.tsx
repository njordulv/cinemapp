import { Chip } from '@nextui-org/react'
import PersonData from '@/types/PersonData'

interface KnownForProps {
  items: PersonData['known_for']
}

const KnownFor: React.FC<KnownForProps> = ({ items }) => (
  <div className="flex items-start gap-1 flex-wrap">
    {items.map((item, index) => (
      <Chip size="sm" key={index} className="bg-green text-white">
        {item?.name}
        {item?.title}
      </Chip>
    ))}
  </div>
)

export default KnownFor
