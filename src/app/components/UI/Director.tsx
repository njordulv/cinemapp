import { Link } from '@nextui-org/react'
import { CrewTypes } from '@/types/data'

interface DirectorProps {
  directed_by?: CrewTypes[]
}

const Director: React.FC<DirectorProps> = ({ directed_by }) => {
  return (
    <>
      {directed_by && directed_by.length > 0 && (
        <div className="flex flex-col">
          <span>Directed by&nbsp;</span>
          <ul className="flex flex-row flex-wrap">
            {directed_by
              .filter((item: CrewTypes) => item.job === 'Director')
              .map((filtered: CrewTypes, index: number) => (
                <li key={index}>
                  <Link
                    href={`/person/${filtered.id}`}
                    className="font-normal text-white"
                  >
                    {index > 0 && ', '}
                    {filtered.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Director
