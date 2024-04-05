import { PersonMoviesTypes } from '@/types/data'

interface DepartmentData {
  cast?: PersonMoviesTypes[]
  crew?: PersonMoviesTypes[]
}

export const getDepartmentData = (
  data: DepartmentData,
  knownFor: string
): PersonMoviesTypes[] => {
  switch (knownFor) {
    case 'Acting':
      return data.cast ?? []
    default:
      return data.crew ?? []
  }
}
