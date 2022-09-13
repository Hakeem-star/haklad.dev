import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const defaultBlurValue = 10;

const HoveredItemBG = styled.p`
  position: absolute;
  inset: 0;

  --blurValue: ${defaultBlurValue}px;
  --opacityValue: 0;
  font-size: 18px;
  font-weight: bold;

  background: linear-gradient(#fff, #999, black);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  opacity: var(--opacityValue);
  filter: url("#background_filter") blur(var(--blurValue));

  transform: scale(1.5);
`;

const HoveredItem = styled.p`
  --blurValue: ${defaultBlurValue}px;
  --opacityValue: 0;

  font-size: 18px;
  font-weight: bold;
  /* 
  background: linear-gradient(#fff, #999, black);
  background-clip: text; */
  color: white;
  /* -webkit-background-clip: text; */
  /* color: transparent; */
  opacity: var(--opacityValue);

  filter: url("#foreground_filter") blur(var(--blurValue));
`;

type Props = {
  text: string;
};

function easeInCirc(
  time: number,
  start: number,
  changeInValue: number,
  duration: number
) {
  return (
    -changeInValue * (Math.sqrt(1 - (time /= duration) * time) - 1) + start
  );
}

function easeOutBack(
  time: number,
  start: number,
  changeInValue: number,
  duration: number
) {
  let s = 1.70158;
  return (
    changeInValue *
      ((time = time / duration - 1) * time * ((s + 1) * time + s) + 1) +
    start
  );
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeInSine(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2);
}
function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}
const Index = ({ text }: Props) => {
  const turbulenceBgRef = useRef<SVGFETurbulenceElement | null>(null);
  const turbulenceFgRef = useRef<SVGFETurbulenceElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [seed, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.random());
  }, []);

  // bg
  useEffect(() => {
    // if (true) return;
    if (!text) return;
    const filter = turbulenceBgRef.current;

    let frames = 1;
    let rad = Math.PI / 180;
    let bfx, bfy, bf;

    const seconds = 0.3;
    const maxTotalLengthMs = seconds * 1000;

    let start = 0;

    function freqAnimation(timestamp: number) {
      if (!filter) return window.cancelAnimationFrame(animFrame);

      if (start === 0) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if (elapsed > maxTotalLengthMs) {
        return window.cancelAnimationFrame(animFrame);
      }

      const increment = elapsed * 0.00001;

      const ratio =
        /* The initial value is too small for floor to round down 2 decimal places,
      so we multiply by ten then divide to get back the preferred value */
        Math.floor((1 - elapsed / maxTotalLengthMs) * 10) / 10;

      bfx = ratio * (0.022 * Math.cos(increment * rad));
      bfy = ratio * (0.022 * Math.sin(increment * rad));

      bf = bfx.toString() + " " + bfy.toString();

      filter.setAttributeNS(null, "baseFrequency", bf);
      const paragraphs = Array.from(
        document.querySelectorAll(".HoveredItem_bg")
      ) as HTMLParagraphElement[] | null;

      paragraphs?.forEach((paragraph) => {
        paragraph?.style?.setProperty(
          "--blurValue",
          (ratio * (defaultBlurValue * (Math.random() + 0.5))).toFixed() + "px"
        );
        paragraph?.style?.setProperty("--opacityValue", ratio + "");
      });

      return window.requestAnimationFrame(freqAnimation);
    }

    const animFrame = window.requestAnimationFrame(freqAnimation);

    return () => {
      window.cancelAnimationFrame(animFrame);
    };
  }, [text]);

  //fg
  useEffect(() => {
    // if (true) return;
    if (!text) return;
    const filter = turbulenceFgRef.current;
    const paragraph = turbulenceFgRef.current;

    let rad = Math.PI / 180;
    let bfx, bfy, bf;

    const seconds = 0.2;
    const maxTotalLengthMs = seconds * 1000;

    let start = 0;

    function freqAnimation(timestamp: number) {
      if (!filter) return window.cancelAnimationFrame(animFrame);

      if (start === 0) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if (elapsed > maxTotalLengthMs) {
        return window.cancelAnimationFrame(animFrame);
      }

      const increment = elapsed * 0.00001;

      const ratio =
        /* The initial value is too small for floor to round down 2 decimal places,
      so we multiply by ten then divide to get back the preferred value */
        Math.floor((1 - elapsed / maxTotalLengthMs) * 10) / 10;
      bfx = ratio * (0.022 * Math.cos(increment * rad));
      bfy = ratio * (0.022 * Math.sin(increment * rad));

      bf = bfx.toString() + " " + bfy.toString();

      filter.setAttributeNS(null, "baseFrequency", bf);
      const paragraphs = Array.from(
        document.querySelectorAll(".HoveredItem_fg")
      ) as HTMLParagraphElement[] | null;

      paragraphs?.forEach((paragraph) => {
        paragraph?.style?.setProperty(
          "--blurValue",
          (ratio * (defaultBlurValue * (Math.random() + 0.5))).toFixed() + "px"
        );
        paragraph?.style?.setProperty("--opacityValue", 1 + -ratio + "");
      });

      return window.requestAnimationFrame(freqAnimation);
    }

    const animFrame = window.requestAnimationFrame(freqAnimation);

    return () => {
      window.cancelAnimationFrame(animFrame);
    };
  }, [text]);
  return (
    <Wrapper>
      <svg width="0" style={{ display: "none" }}>
        <filter id="foreground_filter">
          <feTurbulence
            ref={turbulenceFgRef}
            id="turbulence_fg"
            type="fractalNoise"
            baseFrequency="0.0006"
            numOctaves="2000"
            // accentHeight={0}
            // stitchTiles="noStitch"
            seed={seed}
          />
          <feDisplacementMap in="SourceGraphic" scale="99" />
        </filter>
        <filter id="background_filter">
          <feTurbulence
            ref={turbulenceBgRef}
            id="turbulence_bg"
            type="fractalNoise"
            baseFrequency="0.0006"
            numOctaves="2000"
            seed={seed}
          />
          <feDisplacementMap in="SourceGraphic" scale="99" />
        </filter>
      </svg>
      {/* TODO: Add more layers to the background and possibly add some movement to the foreground */}
      <HoveredItemBG className="HoveredItem_bg" ref={textRef}>
        {text}
      </HoveredItemBG>
      <HoveredItem className="HoveredItem_fg" ref={textRef}>
        {text}
      </HoveredItem>
    </Wrapper>
  );
};

export default Index;
