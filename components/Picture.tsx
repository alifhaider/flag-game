import { TFlag } from '../pages'
import styles from '../styles/Home.module.css'

type Props = {
  onDrop: (item: any) => void
  flag: TFlag
}

export default function Picture({ onDrop, flag }: Props) {
  return <div className={styles.imageBox}>{flag.name}</div>
}
