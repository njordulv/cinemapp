function formatReleaseDate(releaseDate: string) {
  const date = new Date(releaseDate)

  const formattedDate = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return formattedDate
}

function formatReleaseYear(releaseDate: string) {
  const date = new Date(releaseDate)
  const formattedYear = date.toLocaleString('en-GB', { year: 'numeric' })

  return formattedYear
}

function formatReleaseDateAlt(releaseDate: string) {
  const date = new Date(releaseDate)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return formattedDate
}

export { formatReleaseDate, formatReleaseYear, formatReleaseDateAlt }
