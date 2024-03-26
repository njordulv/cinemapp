import { Link } from '@nextui-org/react'
import { CreatedBy } from '@/types/data'

interface CreatorProps {
  created_by?: CreatedBy[]
}

const Creator: React.FC<CreatorProps> = ({ created_by }) => {
  return (
    <>
      {created_by && created_by.length > 0 && (
        <div className="flex flex-col">
          <span>Created by&nbsp;</span>
          <ul className="flex flex-row">
            {created_by.map((creator, index) => (
              <li key={index}>
                <Link
                  href={`/person/${creator.id}`}
                  className="font-normal text-white"
                >
                  {index > 0 && ', '}
                  {creator.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Creator
