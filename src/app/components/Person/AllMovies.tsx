'use client'

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
import { Spinner } from '@nextui-org/react'
import useFetcher from '@/hooks/useFetcher'
import { formatReleaseYear } from '@/utils/formatDate'
import { PersonMoviesTypes } from '@/types/data'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
const NO_IMAGE = '/no-image.svg'

interface Props {
  id: number
}

export default function AllMovies({ id }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=person/${id}/combined_credits`,
  })

  if (isLoading) return <Spinner color="default" />
  if (isError) return <div>Error loading data...</div>

  return (
    <>
      <h2 className="flex py-2 px-3 my-5 font-medium text-[17px] leading-6 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent dark:bg-transparent shadow-sm rounded-medium border-transpLight border-1">
        All Movies
      </h2>
      <Table
        isHeaderSticky
        hideHeader
        radius="sm"
        aria-label="Crew table"
        classNames={{
          base: 'max-h-[525px] overflow-scroll',
          table: 'min-h-[420px]',
          wrapper: 'bg-default-900 rounded-medium',
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
          {data &&
            data.cast.map((movie: PersonMoviesTypes, index: number) => (
              <TableRow key={movie.credit_id}>
                <TableCell>
                  <span className="text-white/70">{index + 1}</span>
                </TableCell>
                <TableCell className="flex">
                  <Link
                    href={`${
                      movie.media_type === 'movie' ? '/movie/' : '/tv/'
                    }${movie.id}`}
                    className="text-white"
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
                  <span className="text-white/60">
                    {movie.media_type === 'movie' ? 'Movie' : 'TV Show'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-white/60 uppercase">
                    {movie.original_language}
                  </span>
                </TableCell>
                <TableCell>
                  {formatReleaseYear(
                    movie.release_date || movie.first_air_date
                  )}
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
