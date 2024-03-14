import Logo from '@/components/Common/Logo'
import Nav from './Nav'
import styles from '@/styles/header.module.scss'

export default function Header() {
  return (
    <>
      <header className="bg-background/10 backdrop-blur-[2px]">
        <div className={styles.header}>
          <div className={styles.header_wrapper}>
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
    </>
  )
}
