import type { InferGetServerSidePropsType } from 'next'
import * as React from 'react'
import Head from 'next/head'
import { DndProvider, useDrag } from 'react-dnd'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DragBox from '../components/DragBox'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [droppedBoxNames, setDroppedBoxNames] = React.useState<Array<String>>(
    [],
  )

  const [currentFlags, setCurrentFlags] = React.useState(() =>
    getMultipleRandom(data, 3),
  )

  function shuffleArray(array: Array<TFlag>) {
    let curId = array.length
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId)
      curId -= 1
      let tmp = array[curId]
      array[curId] = array[randId]
      array[randId] = tmp
    }
    return array
  }

  function getMultipleRandom(arr: Array<TFlag>, num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())

    return shuffled.slice(0, num)
  }

  const handleDrop = (index: number, flag: TFlag) => {}

  // const handleDrop = React.useCallback(
  //   (index: number, flag: TFlag) => {
  //     const { name } = flag;
  //     setDroppedBoxNames(
  //       update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
  //     );
  //     setDustbins(
  //       update(dustbins, {
  //         [index]: {
  //           lastDroppedItem: {
  //             $set: item,
  //           },
  //         },
  //       })
  //     );
  //   },
  //   [droppedBoxNames, dustbins]
  // );

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
          <div className={styles.container}>
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
          </div>
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
