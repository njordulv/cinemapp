'use client'

import { Spinner } from '@nextui-org/react'
import { ReleaseDatesTypes, CertificationTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'

interface Props {
  id: number
  production_countries?: { iso_3166_1: string }[]
}

export default function Certification({ id, production_countries }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/${id}/release_dates`,
  })

  const getMovieCertification = () => {
    const countryCode = production_countries?.[0]?.iso_3166_1

    if (!countryCode) return ''

    const usRelease = data?.results?.find(
      (item: CertificationTypes) => item.iso_3166_1 === countryCode
    )

    if (!usRelease?.release_dates) return countryCode

    const certification = usRelease.release_dates.find(
      (name: ReleaseDatesTypes) => name.certification !== ''
    )?.certification

    return certification || countryCode
  }

  const certification = getMovieCertification()

  return (
    <span className="flex items-center border-white/70 border-small bg-slate-400/20 text-shadow-sm px-1 text-sm shadow-md">
      {isLoading ? (
        <Spinner color="default" size="sm" />
      ) : isError ? (
        '-'
      ) : (
        certification && certification
      )}
    </span>
  )
}
