'use client'

import { ContentRatingsTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import Error from '@/components/UI/Error'
import Loader from '@/components/UI/Loader'

interface Props {
  id: number
}

export default function ContentRatings({ id }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=tv/${id}/content_ratings`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  return (
    <div className="flex items-center gap-1">
      {data.results
        ?.filter((item: ContentRatingsTypes) => item.iso_3166_1 === 'US')
        .slice(0, 1)
        .map((filtered: ContentRatingsTypes, index: number) => (
          <span
            key={index}
            className="flex items-center border-white/60 border-small px-1 text-sm"
          >
            {filtered.rating}
          </span>
        ))}
    </div>
  )
}
