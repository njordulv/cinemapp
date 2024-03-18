type Props = {
  birthdayType: string
  deathdayType?: string | null
}

export default function calculateAge({
  birthdayType,
  deathdayType,
}: Props): number {
  const birthday = new Date(birthdayType)
  const endDate = deathdayType ? new Date(deathdayType) : new Date()
  let age = endDate.getFullYear() - birthday.getFullYear()
  const m = endDate.getMonth() - birthday.getMonth()
  if (m < 0 || (m === 0 && endDate.getDate() < birthday.getDate())) {
    age--
  }
  return age
}
