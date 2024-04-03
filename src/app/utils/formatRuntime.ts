function convertMinToHrs(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`
}

export default convertMinToHrs
