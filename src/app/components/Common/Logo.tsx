import Link from 'next/link'
import { useLocale } from 'next-intl'
import styles from '@/styles/header.module.scss'

export default function Logo() {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/`} className={styles.header_logo}>
      CINEMAPP
    </Link>
  )
}
