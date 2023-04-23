import { gsap } from "gsap";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import StartMenu from "../components/StartMenu";
import styles from "../styles/Home.module.css";
import VolumeMute from "./assets/VolumeMute.svg";
import VolumeUnMute from "./assets/VolumeUnMute.svg";

const flash = keyframes`
  to {
    opacity: 0.5;
  }
`;

const StartButton = styled.h2`
  cursor: pointer;
  animation: ${flash} 1s ease-in-out infinite;
`;

const VolumeContainer = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 3;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(75% 30%, transparent, black), transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  z-index: 2;
  pointer-events: none;
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

  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started) {
      gsap.to(nameRef.current, {
        y: "-40%",
        ease: "power4.easeIn",
        duration: 0.3,
      });
    }
  }, [started]);

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

      <main
        className={styles.main}
        style={{
          minHeight: "100vh",
          position: "relative",
        }}
      >
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

        <GradientOverlay />
        <div style={{ position: "relative", padding: 20 }} ref={nameRef}>
          {/* TODO - After clicking start, this should animate up and the items can stagger in */}
          <H1 className={styles.title}>Hakeem Ladejobi</H1>
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
          <div
            style={{
              zIndex: 3,
            }}
          >
            <StartMenu handleLinkHover={handleLinkHover} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
