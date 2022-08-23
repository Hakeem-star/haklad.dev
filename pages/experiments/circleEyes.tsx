import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { degrees_to_radians } from "../../util/degrees_to_radians";

const EyeWrapper = styled.div<{ placement: { x: number; y: number } }>`
  position: absolute;
  inset: 0;
  transform: ${({ placement: { x, y } }) =>
    `translate(${x + window.innerWidth / 2}px, ${
      y + window.innerHeight / 2
    }px)`};
  width: fit-content;
  height: fit-content;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  gap: 20px;
`;

const EyeBall = styled.div`
  background: black;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const EyeWhite = styled.div`
  width: 100px;
  height: 100px;

  background: white;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  outline: 2px solid black;
`;

const CircleEyes = () => {
  const sides = 10;
  const radius = 200;
  const sliceAngle = 360 / sides;

  useEffect(() => {
    const handleMousemove = (e: MouseEvent) => {
      const eyeWhites = document.querySelectorAll(".EyeWhite");
      const eyeBalls = document.querySelectorAll(".EyeBall");

      if (!eyeBalls || !eyeWhites) return;
      Array.from(eyeWhites).forEach((_, idx) => {
        const eyeWhite = eyeWhites[idx];
        const eyeBall = eyeBalls[idx];
        const eyeBallRect = eyeBall.getBoundingClientRect();
        const eyeWhiteRect = eyeWhite.getBoundingClientRect();

        // These X and Y positions describe the length of the sides of the triangle
        // These are relative to the origin
        let x = e.clientX - eyeWhiteRect.left - eyeWhiteRect.width / 2;
        let y = e.clientY - eyeWhiteRect.top - eyeWhiteRect.height / 2;

        // find the angle between the x and y as a radian
        const angle = Math.atan2(y, x);
        const radius = eyeWhiteRect.width / 2 - eyeBallRect.width / 2;

        // use the angle to calculate the x and y position of the eyeball
        const newLeft = Math.cos(angle) * radius;
        const newTop = Math.sin(angle) * radius;

        eyeBall.setAttribute(
          "style",
          `transform: translate(${newLeft}px,${newTop}px)`
        );
      });
    };

    document.addEventListener("mousemove", handleMousemove);
  }, []);

  return (
    <Wrapper>
      {Array(sides)
        .fill(Array(sides).keys())
        .map((v, idx) => {
          let x = radius * Math.sin(degrees_to_radians(sliceAngle * idx));
          let y = radius * Math.cos(degrees_to_radians(sliceAngle * idx));
          return (
            <EyeWrapper placement={{ x, y }} key={idx}>
              <EyeWhite className={"EyeWhite"}>
                <EyeBall className={"EyeBall"} />
              </EyeWhite>
            </EyeWrapper>
          );
        })}
    </Wrapper>
  );
};
export default CircleEyes;
