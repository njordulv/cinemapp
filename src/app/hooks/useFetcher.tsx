import useSWR from 'swr'

interface Props {
  endpoint: string
}

export default function useFetcher({ endpoint }: Props) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSWR(endpoint, fetcher)

  return {
    data: data,
    isLoading,
    isError: error,
  }
}
