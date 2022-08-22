import type { NextPage, InferGetServerSidePropsType } from "next";
import React from "react";
import Head from "next/head";
import { useDrag } from "react-dnd";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import DragBox from "../components/DragBox";

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [currentFlags, setCurrentFlags] = React.useState(() =>
    getMultipleRandom(data, 3)
  );

  function shuffleArray(array: Array<Props>) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

  function getMultipleRandom(arr: Array<Props>, num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  function handleDrop(evt: React.DragEvent<HTMLDivElement>) {
    console.log("hi");
  }

  return (
    <div>
      <Head>
        <title>Flag Game</title>
        <meta name="description" content="Drag and drop the flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>Drag and drop flags</h2>
        <div className={styles.container}>
          <div className={styles.flagsContainer}>
            {currentFlags.map((flag, index) => (
              <>
                <DragBox
                  onDrop={(flag: Props) => handleDrop(index, item)}
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
      </main>
    </div>
  );
};

type Props = {
  name: string;
  code: string;
  capital: string;
  region: string;
  flag: string;
};

export async function getServerSideProps() {
  const res = await fetch(`https://countryflagapi.herokuapp.com/all`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data : Props }, // will be passed to the page component as props
  };
}

export default Home;
