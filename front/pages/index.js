import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Map from '../components/Map'


export default function Home() {
  return (
    <div className={styles.container}>
      <Map></Map>
    </div>
  )
}
