import Link from 'next/link'
import styles from '../styles/Error.module.css'

export default function FourOhFour() {
  return <>
    <div className={styles.background}></div>
      <img className={styles.errorImage} src="../error image.png"></img>
      <a className={styles.notFound}>Oops!</a>
      <a className={styles.description}>The page you are looking for doesn't exist.</a>
      <Link href="/">
        <div className={styles.linkWrapper}>
          <a className={styles.link}>
            Go Back Home
          </a>
        </div>
        
      </Link>
  </>
}