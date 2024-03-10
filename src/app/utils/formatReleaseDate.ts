function formatReleaseDate(releaseDate: string) {
  const date = new Date(releaseDate)

  const formattedDate = date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return formattedDate
}

export default formatReleaseDate
