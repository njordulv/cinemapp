import { Link } from '@nextui-org/react'

interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

interface CreatorProps {
  created_by?: CreatedBy[]
}

const Creator: React.FC<CreatorProps> = ({ created_by }) => {
  return (
    <>
      {created_by && created_by.length > 0 && (
        <div className="flex flex-col">
          <span>Created by&nbsp;</span>
          {created_by.map((creator, index) => (
            <div key={index}>
              <Link
                href={`/person/${creator.id}`}
                className="font-normal text-white"
                underline="hover"
              >
                {creator.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Creator
