'use client'

import { Spinner } from '@nextui-org/react'
import { ReleaseDatesTypes, CertificationTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'

interface Props {
  id: number
}

export default function Certification({ id }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/${id}/release_dates`,
  })

  const getMovieCertification = () => {
    const usRelease = data?.results.find(
      (item: CertificationTypes) => item.iso_3166_1 === 'US'
    )

    if (!usRelease?.release_dates) return ''

    const certification = usRelease.release_dates.find(
      (name: ReleaseDatesTypes) => name.certification !== ''
    )?.certification

    return certification || ''
  }

  const certification = getMovieCertification()

  return (
    <span className="flex items-center border-white/60 border-small px-1 text-sm">
      {isLoading ? (
        <Spinner color="default" size="sm" />
      ) : isError ? (
        '-'
      ) : (
        certification
      )}
    </span>
  )
}
