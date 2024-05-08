import Link from 'next/link'
import styles from '@/styles/logo.module.scss'

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <span className={styles.logo__one}>
        C<span id="letterFade">IN</span>E
      </span>
      <span className={styles.logo__one}>
        M
        <span className={styles.logo__two} id="letterBlink">
          A
        </span>
        P<span id="letterEnd">P</span>
      </span>
    </Link>
  )
}
