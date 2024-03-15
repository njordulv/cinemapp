type Props = {
  birthdayType: string
}

export default function calculateAge({ birthdayType }: Props): number {
  const birthday = new Date(birthdayType)
  const today = new Date()
  let age = today.getFullYear() - birthday.getFullYear()
  const m = today.getMonth() - birthday.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--
  }
  return age
}
