import SeasonsData from '@/types/SeasonsData'

const getLastSeason = (seasons: SeasonsData[]): SeasonsData | undefined => {
  return seasons.reduce(
    (last: SeasonsData | undefined, current: SeasonsData) => {
      if (current.season_number === 0) return last
      return !last || last.season_number < current.season_number
        ? current
        : last
    },
    undefined
  )
}

export default getLastSeason
