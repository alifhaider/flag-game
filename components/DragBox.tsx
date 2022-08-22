import styles from '../styles/Home.module.css';

type Props = {
    onDrop: (item: any) => void;
    flag: 
}

export default function DragBox({ onDrop, flag }) {
  return <div
  className={styles.imageBox}
>
  {flag.name}
</div>;
}
