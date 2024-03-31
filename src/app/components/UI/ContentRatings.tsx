'use client'

import { Spinner } from '@nextui-org/react'
import { ContentRatingsTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'

interface Props {
  id: number
}

export default function ContentRatings({ id }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${id}/content_ratings`,
  })

  const getContentRating = () => {
    const usRatings = data?.results?.filter(
      (item: ContentRatingsTypes) => item.iso_3166_1 === 'US'
    )
    return usRatings
      ?.slice(0, 1)
      .map((item: ContentRatingsTypes) => item.rating)
  }

  const contentRating = getContentRating()

  return (
    <span className="flex items-center border-white/60 border-small px-1 text-sm">
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
