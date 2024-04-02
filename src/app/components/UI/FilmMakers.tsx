import { Link } from '@nextui-org/react'
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

  return (
    <>
      <div className={styles.item}>
        <span>{position}</span>
        <ul className={styles.items__list}>
          {relevantFilmMakers.map((person, index: number) => (
            <li key={index} className={index > 0 ? styles.items__listItem : ''}>
              <Link
                href={`/person/${person.id}`}
                className={styles.items__link}
              >
                {person.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FilmMakers
