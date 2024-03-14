import Link from 'next/link'
import styles from '@/styles/logo.module.scss'

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      CINEMAPP
    </Link>
  )
}
