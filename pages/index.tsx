import * as React from 'react'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import styles from '../styles/Home.module.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragDrop from '../components/DragDrop'

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data)
  return (
    <div>
      <Head>
        <title>Flag Game</title>
        <meta name="description" content="Drag and drop the flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>Drag and drop flags</h2>
        <DndProvider backend={HTML5Backend}>
          <div>Alif</div>
          {/* <DragDrop flag={data} /> */}
          {/* <div className={styles.container}>
            <div className={styles.flagsContainer}>
              {currentFlags.map((flag, index) => (
                <>
                  <DragBox
                    onDrop={(flag: TFlag) => handleDrop(index, flag)}
                    key={flag.code}
                    flag={flag}
                  />
                </>
              ))}
            </div>
            <div className={styles.namesContainer}>
              {shuffleArray(currentFlags).map((flag) => (
                <div className={styles.nameBox} key={flag.code}>
                  {flag.name}
                </div>
              ))}
            </div>
          </div> */}
        </DndProvider>
      </main>
    </div>
  )
}

export type TFlag = {
  name: string
  code: string
  capital: string
  region: string
  flag: string
}

export async function getServerSideProps() {
  const res = await fetch(`https://countryflagapi.herokuapp.com/all`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}

export default Home
