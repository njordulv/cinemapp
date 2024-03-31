import { ReleaseDatesTypes, CertificationTypes } from '@/types/data'
import useFetcher from '@/hooks/useFetcher'
import Error from '@/components/UI/Error'
import Loader from '@/components/UI/Loader'

interface Props {
  id: number
}

export default function Certification({ id }: Props) {
  const { data, isError, isLoading } = useFetcher({
    endpoint: `/api/movies?endpoint=movie/${id}/release_dates`,
  })

  if (isError) return <Error errorText={isError.message} />
  if (isLoading || !data) return <Loader />

  const getMovieCertification = data.results
    ?.find((item: CertificationTypes) => item.iso_3166_1 === 'US')
    ?.release_dates.find((date: ReleaseDatesTypes) => date.certification !== '')

  return (
    <>
      {getMovieCertification && (
        <span className="flex items-center border-white/60 border-small px-1 text-sm">
          {getMovieCertification.certification}
        </span>
      )}
    </>
  )
}
