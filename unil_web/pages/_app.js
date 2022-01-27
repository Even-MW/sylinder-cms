import '../styles/globals.css'

import Link from "next/link"
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Link href="/">
      <a>
        <h1 className={styles.underline}>Editor experience</h1>
      </a>
    </Link>
    <Component {...pageProps} />
  </>
}

export default MyApp
