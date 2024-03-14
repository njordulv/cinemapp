import Link from 'next/link'
import { useLocale } from 'next-intl'
import styles from '@/styles/logo.module.scss'

export default function Logo() {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/`} className={styles.logo}>
      CINEMAPP
    </Link>
  )
}
