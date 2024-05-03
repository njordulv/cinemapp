'use client'

import { Spinner } from '@nextui-org/react'
import { ContentRatingsTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'

interface Props {
  id: number
  production_countries?: { iso_3166_1: string }[]
}

export default function ContentRatings({ id, production_countries }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${id}/content_ratings`,
  })

  const countryCode = production_countries?.[0]?.iso_3166_1
  if (!countryCode) return null

  const getContentRating = () => {
    const usRatings = data?.results?.filter(
      (item: ContentRatingsTypes) => item.iso_3166_1 === countryCode
    )
    return usRatings
      ?.slice(0, 1)
      .map((item: ContentRatingsTypes) => item.rating)
  }

  const contentRating = getContentRating()

  return (
    <span className="flex items-center justify-center min-w-12 border-white/80 border-small px-1 text-sm text-shadow-sm">
      {isLoading ? (
        <Spinner color="default" size="sm" />
      ) : isError || !contentRating ? (
        '-'
      ) : (
        contentRating
      )}
    </span>
  )
}
