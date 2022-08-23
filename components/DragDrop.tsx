import * as React from 'react'
import styles from '../styles/Home.module.css'
import Picture from './Picture'
import { TFlag } from '../pages'

function DragDrop(props: Array<TFlag>) {
  const [droppedBoxNames, setDroppedBoxNames] = React.useState<Array<String>>(
    [],
  )

  const [currentFlags, setCurrentFlags] = React.useState(() =>
    getMultipleRandom(props, 3),
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
  return (
    <div>
      <div className={styles.flagsContainer}>
        {currentFlags.map((flag, index) => (
          <div>
            <Picture
              onDrop={(flag: TFlag) => handleDrop(index, flag)}
              key={flag.code}
              flag={flag}
            />
          </div>
        ))}
      </div>
      <div className="names"></div>
    </div>
  )
}

export default DragDrop
