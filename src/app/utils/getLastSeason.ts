import { Seasons } from '@/types/data'

const getLastSeason = (seasons: Seasons[]): Seasons | undefined => {
  return seasons.reduce((last: Seasons | undefined, current: Seasons) => {
    if (current.season_number === 0) return last
    return !last || last.season_number < current.season_number ? current : last
  }, undefined)
}

export default getLastSeason
