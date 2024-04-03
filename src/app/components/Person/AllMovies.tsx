import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Link,
} from '@nextui-org/react'
import { IoStarSharp } from 'react-icons/io5'
import { PersonMoviesTypes } from '@/types/data'
import { formatReleaseYear } from '@/utils/formatDate'

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

interface Props {
  data: {
    cast: PersonMoviesTypes[]
  }
}

const AllMovies: React.FC<Props> = ({ data }) => {
  const sortedByYear = [...(data.cast ?? [])].sort((a, b) => {
    const date = new Date()
    const fallbackYear = date.getFullYear()
    const aDate = a.release_date || a.first_air_date
    const bDate = b.release_date || b.first_air_date
    const aYear = aDate ? Number(formatReleaseYear(aDate)) : fallbackYear
    const bYear = bDate ? Number(formatReleaseYear(bDate)) : fallbackYear

    return bYear - aYear
  })

  return (
    <>
      <h2 className="flex py-2 px-3 mt-8 mb-3 font-medium text-[17px] leading-6 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent dark:bg-transparent shadow-sm rounded-medium border-default-200 border-1">
        All Movies
      </h2>
      <Table
        isHeaderSticky
        hideHeader
        isStriped
        radius="md"
        aria-label="All person movies"
        classNames={{
          base: 'max-h-[525px] overflow-scroll',
          wrapper: 'rounded-medium',
        }}
      >
        <TableHeader>
          <TableColumn className="text-md">Number</TableColumn>
          <TableColumn className="text-md">Name</TableColumn>
          <TableColumn className="text-md">Role</TableColumn>
          <TableColumn className="text-md">Media type</TableColumn>
          <TableColumn className="text-md">Original Language</TableColumn>
          <TableColumn className="text-md">Year</TableColumn>
          <TableColumn className="text-md">Popularity</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedByYear.map((movie: PersonMoviesTypes, index: number) => (
            <TableRow key={movie.credit_id} className="table-row">
              <TableCell>
                <span className="text-white/70">{index + 1}</span>
              </TableCell>
              <TableCell className="flex">
                <Link
                  href={`${movie.media_type === 'movie' ? '/movie/' : '/tv/'}${
                    movie.id
                  }`}
                  className="text-white hover:text-special transition-all"
                >
                  <User
                    name={movie.title || movie.name}
                    description={formatReleaseYear(
                      movie.release_date || movie.first_air_date
                    )}
                    avatarProps={{
                      radius: 'sm',
                      src: movie.poster_path
                        ? `${BASE_IMAGE_URL}w92${movie.poster_path}`
                        : NO_IMAGE,
                    }}
                  />
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-white">
                    {movie.character || String.fromCharCode(9866)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-white/60 justify-center flex text-center">
                  {movie.media_type === 'movie' ? 'Movie' : 'TV Show'}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-white/60 uppercase">
                  {movie.original_language}
                </span>
              </TableCell>
              <TableCell>
                {formatReleaseYear(movie.release_date || movie.first_air_date)}
              </TableCell>
              <TableCell>
                <Chip
                  startContent={
                    <IoStarSharp size={15} className="text-orange-300" />
                  }
                  variant="solid"
                  className="text-white bg-transparent"
                >
                  {movie?.vote_average.toFixed(1) ?? 'No rating'}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AllMovies
