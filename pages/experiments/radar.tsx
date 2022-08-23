import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { degrees_to_radians } from "../../util/degrees_to_radians";
import { radians_to_degrees } from "../../util/radians_to_degrees";

const mainCircleRadius = 100;
const innerCircleShapeRadius = 10;
const innerCircleAreaRadius = mainCircleRadius - 20; // main - padding

let frameCounter = 0;
let mouseAngleRadians = 0;
let dynamicRadius = 0;

type Props = {};

const Octopus = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let x = window.innerWidth / 2;
    let y = ctx.canvas.height / 2;

    const handleMousemove = (e: MouseEvent) => {
      let x2 = e.clientX - x;
      let y2 = e.clientY - y;

      // find the angle between the x and y as a radian
      mouseAngleRadians = Math.atan2(y2, x2);
      dynamicRadius = Math.sqrt(x2 * x2 + y2 * y2) * 0.3;

      // use the angle to calculate the x and y position of the eyeball
      const newLeft = Math.cos(mouseAngleRadians) * dynamicRadius;
      const newTop = Math.sin(mouseAngleRadians) * dynamicRadius;
    };

    function draw(ctx: CanvasRenderingContext2D) {
      y = Math.sin(x * 0.05) * 100 + ctx.canvas.height / 2;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      drawMainCircle(ctx, x, y, mainCircleRadius, 1);
      drawMainCircle(ctx, x, y, mainCircleRadius + 20, 2);

      drawMainCircle(ctx, x, y, mainCircleRadius - 40, 3);
      drawMainCircle(ctx, x, y, mainCircleRadius + 20, 4);
      if (x >= ctx.canvas.width + mainCircleRadius) {
        x = 0;
      }
      // x++;
      frameCounter += 0.15;
      requestAnimationFrame(() => draw(ctx));
    }

    draw(ctx);
    document.addEventListener("mousemove", handleMousemove);

    return () => {
      document.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

function drawMainCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  idx: number
) {
  ctx.fillStyle = "green";
  ctx.beginPath();
  const r = radius / 3 + radius * Math.abs(Math.cos(frameCounter * 0.02)) * idx;
  ctx.arc(
    x,
    y,
    ((r * Math.max(dynamicRadius / 2, innerCircleAreaRadius / 2.5)) / r) * idx,
    -Math.PI / 4 + mouseAngleRadians,
    Math.PI / 4 + mouseAngleRadians
  );
  ctx.strokeStyle = "green";

  ctx.stroke();
}

function drawInnerCircles(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  innerCircleShapeRadius: number,
  idx: number
) {
  const amount = 15;
  const sideAngle = 360 / amount;

  for (let i = 0; i < amount; i++) {
    // let x2 =
    //   x -
    //   mainCircleRadius +
    //   radius * Math.cos(degrees_to_radians(sideAngle * i));
    // let y2 = y - radius * Math.sin(degrees_to_radians(sideAngle * i));

    // spin circles

    let x2 =
      x -
      radius *
        Math.cos(frameCounter * 0.05) *
        idx *
        Math.abs(Math.cos((frameCounter - (idx - 1) * 30) * 0.02)) *
        Math.cos(
          degrees_to_radians(sideAngle * i) +
            (frameCounter - (idx - 1) * 30) * 0.02
        ) *
        idx;

    let y2 =
      y -
      radius *
        Math.cos(frameCounter * 0.05) *
        idx *
        Math.abs(Math.cos((frameCounter - (idx - 1) * 30) * 0.02)) *
        Math.sin(
          degrees_to_radians(sideAngle * i) +
            (frameCounter - (idx - 1) * 30) * 0.02
        ) *
        idx;

    drawInnerCircle(
      ctx,
      x2,
      y2,
      innerCircleShapeRadius,
      Math.abs(
        radius *
          Math.cos(frameCounter * 0.05) *
          idx *
          Math.abs(Math.cos((frameCounter - (idx - 1) * 30) * 0.02)) +
          (frameCounter - (idx - 1) * 30) * 0.02 * idx * 0.01
      ) / radius
    );
  }
}

function drawInnerCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  outerRadius: number
) {
  const localAngle = Math.atan2(
    y - window.innerHeight / 2,
    x - window.innerWidth / 2
  );
  const localAngleDegrees = radians_to_degrees(localAngle);
  const opacity = Math.abs(
    (localAngleDegrees - (radians_to_degrees(mouseAngleRadians) + 200)) /
      localAngleDegrees
  );
  ctx.fillStyle = `hsla(${localAngleDegrees + 180},${100}%,50%,${outerRadius})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.strokeStyle = `hsla(${(outerRadius - 1) * 360},100%,50%,1)`;
  ctx.fill();
  ctx.stroke();
}

export default Octopus;
