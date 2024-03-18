export default function formatBudget(num: number) {
  return num
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})(?=\d)/g, '$1.')
    .split('')
    .reverse()
    .join('')
}
