import { Link, Chip, Avatar } from '@nextui-org/react'
import { FilmMakerTypes, CreatedBy } from '@/types/data'
import styles from '@/styles/filmMakers.module.scss'

interface FilmMakersProps {
  filmMaker?: (FilmMakerTypes | CreatedBy)[]
  position?: string
  job?: string
  isCreator?: boolean
}

function isFilmMakerType(
  person: FilmMakerTypes | CreatedBy
): person is FilmMakerTypes {
  return (person as FilmMakerTypes).job !== undefined
}

const FilmMakers: React.FC<FilmMakersProps> = ({
  filmMaker,
  position,
  job,
  isCreator = false,
}) => {
  const relevantFilmMakers = filmMaker?.filter(
    (person) => isCreator || (isFilmMakerType(person) && person.job === job)
  )

  if (!relevantFilmMakers || relevantFilmMakers.length === 0) {
    return null
  }

  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  return (
    <>
      <div className={styles.item}>
        <span>{position}</span>
        <ul className={styles.items__list}>
          {relevantFilmMakers.map((person, index: number) => (
            <li key={index} className={styles.items__listItem}>
              <Link href={`/person/${person.id}`}>
                <Chip
                  radius="md"
                  variant="flat"
                  className="bg-black/90 text-white hover:text-special transition-all"
                  avatar={
                    <Avatar
                      radius="sm"
                      name={person.name}
                      src={
                        person.profile_path
                          ? `${BASE_IMAGE_URL}w92${person.profile_path}`
                          : NO_IMAGE
                      }
                    />
                  }
                >
                  {person.name}
                </Chip>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FilmMakers
