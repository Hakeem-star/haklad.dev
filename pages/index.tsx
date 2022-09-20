import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import VolumeMute from "./assets/VolumeMute.svg";
import VolumeUnMute from "./assets/VolumeUnMute.svg";
import StartMenu from "../components/StartMenu";

const StartButton = styled.h2`
  cursor: pointer;
`;

const VolumeContainer = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 25px;
`;

const StyledLink = styled.a`
  color: white;
  cursor: pointer;
  width: 100%;
  position: relative;

  &:hover {
    text-decoration: underline;
    color: red;

    :after {
      content: "";
      position: absolute;
      inset: 0;
      // 50px = hand cursor width
      left: -60px;
      top: 6px;
      background: url("./FF7Cursor.webp") no-repeat;
      background-size: contain;
      width: 50px;
    }
  }
`;

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 5px;

  li {
    display: flex;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(transparent, black), transparent;
`;

const H1 = styled.h1`
  user-select: none;
  position: relative;
  color: white;
  &::after {
    content: "";
  }
`;

const Home: NextPage = () => {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("./Cursor-Move.wav");
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.2;
    // TODO: check if the audio was muted instead of making an assumption
    // audioRef.current.muted = true;
  }, []);

  const handleLinkHover = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>HakLad.dev</title>
        <meta
          name="description"
          content="Personal website of Hakeem Ladejobi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <VolumeContainer
          onClick={() => {
            setMuted((v) => {
              if (audioRef.current) {
                audioRef.current.muted = !v;
              }

              return !v;
            });
          }}
        >
          {muted ? <VolumeMute /> : <VolumeUnMute />}
        </VolumeContainer>

        <div style={{ position: "relative", padding: 20 }}>
          <H1 className={styles.title}>Hakeem Ladejobi</H1>
          <GradientOverlay />
        </div>
        {/* TODO - use context to preserve the state, so when people return, 
        they won't need to do this again */}
        {!started ? (
          <StartButton
            onClick={() => {
              setStarted(true);
            }}
          >
            START
          </StartButton>
        ) : (
          <StartMenu handleLinkHover={handleLinkHover} />
        )}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
