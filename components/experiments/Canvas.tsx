import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { generateRain } from "./utils/generateRain";
import { perlinNoise } from "./utils/perlinNoise";
const CanvasWrapper = styled.canvas`
  position: fixed;
  inset: 0;
`;

function drawSkyline(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const ratio = img.width / img.height;
  const width = 1800;

  ctx?.drawImage(img, 300, 250, width, width / ratio);
}
function drawBridge(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const ratio = img.width / img.height;
  const width = 2400;
  ctx.save(); // save the current canvas state
  ctx.translate(window.innerWidth, 0);

  ctx.scale(-1, 1);

  ctx?.drawImage(img, 300, 120, width, width / ratio);
  ctx.restore(); // restore the state as it was when this function was called
}

type Props = {};

const Canvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bridgeRef = useRef<HTMLImageElement | null>(null);
  const skylinesRef = useRef<HTMLImageElement | null>(null);

  const getContext = () => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    return ctx;
  };

  // setup
  useEffect(() => {
    const ctx = getContext();
    if (!ctx) return;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let x = window.innerWidth / 2;
    let y = ctx.canvas.height / 2;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  // clouds
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    perlinNoise(
      canvas,
      { r: 0, g: 0, b: 0 },
      { r: 119, g: 200, b: 255 },
      1,
      1.4
    );
  }, []);

  // skyline
  useEffect(() => {
    const ctx = getContext();
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      skylinesRef.current = img;

      drawSkyline(ctx, img);
    };
    img.src = "./images/new-york-skyline.png";

    return () => {};
  }, []);

  // bridge
  useEffect(() => {
    const ctx = getContext();
    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      bridgeRef.current = img;

      drawBridge(ctx, img);
    };
    img.src = "./images/pngfind.com-bridge-png-517681.png";

    return () => {};
  }, []);

  //   // rain
  //   useEffect(() => {
  //     const ctx = getContext();
  //     if (!ctx) return;

  //     const rain = generateRain(ctx);

  //     const run = () => {
  //       // clear canvas
  //       //   ctx.fillStyle = "white";
  //       ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //       if (skylinesRef.current) {
  //         drawSkyline(ctx, skylinesRef.current);
  //       }
  //       if (bridgeRef.current) {
  //         drawBridge(ctx, bridgeRef.current);
  //       }
  //       rain();
  //       requestAnimationFrame(run);
  //     };

  //     run();
  //   }, []);

  return <CanvasWrapper ref={canvasRef} />;
};

export default Canvas;
