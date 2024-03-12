function formatReleaseDate(releaseDate: string) {
  const date = new Date(releaseDate)

  const formattedDate = date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return formattedDate
}

function formatReleaseYear(releaseDate: string) {
  const date = new Date(releaseDate)
  const formattedYear = date.toLocaleString('en-US', { year: 'numeric' })

  return formattedYear
}

function formatReleaseDateAlt(releaseDate: string) {
  const date = new Date(releaseDate)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })

  return formattedDate
}

export { formatReleaseDate, formatReleaseYear, formatReleaseDateAlt }
