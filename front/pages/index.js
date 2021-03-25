import React, {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Components
import Map from '../components/Map'
import Add from '../components/Add'
import NewRequest from '../components/NewRequest'

export default function Home() {
  const [formVisability, setFormVisability] = useState(false)

  return (
    <div>
      <Map />
      <Add setFormVisability={setFormVisability} formVisability={formVisability} />
      <NewRequest formVisability={formVisability} />
    </div>
  )
}
