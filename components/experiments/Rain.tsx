import { Point, Points, useTexture } from "@react-three/drei";
import { PointsProps, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import {
  AdditiveBlending,
  Blending,
  Color,
  CompressedPixelFormat,
  Points as PointsType,
} from "three";

type Props = {};

const minSize = 1;
const maxSize = 4;
const minAngle = 44.95;
const maxAngle = 45.05;
const totalCount = 1000;
const speed = 2;

let maxX = 100;
let maxY = -40;

function getPosition() {
  let minX = -100;
  let maxX = 100;

  let minY = 100;
  let maxY = -40;

  let minZ = -15;
  let maxZ = 40;

  let randX = Math.random() * (maxX - minX) + minX;
  let randY = Math.random() * (maxY - minY) + minY;
  let randZ = Math.random() * (maxZ - minZ) + minZ;

  let xPos = randX - maxSize;
  let yPos = randY - maxSize;
  let zPos = randZ;

  return [
    Number(xPos.toFixed()),
    Number(yPos.toFixed()),
    Number(zPos.toFixed()),
  ];
}

function getRandomSize() {
  // set drop size based on weighted distribution
  let sizeRange = maxSize - minSize;
  let sizeRandMin = minSize;
  let sizeRandMax = maxSize;

  let rand = Math.random();
  if (rand < 0.7) {
    // small 70%
    sizeRandMin = minSize;
    sizeRandMax = minSize + sizeRange / 3;
  } else if (rand < 0.95) {
    // medium 20%
    sizeRandMin = minSize + sizeRange / 3;
    sizeRandMax = maxSize - sizeRange / 3;
  } else {
    // large 5%
    sizeRandMin = maxSize - sizeRange / 3;
    sizeRandMax = maxSize;
  }

  let size = Math.random() * sizeRange + sizeRandMin;
  // set variation in drop angle
  const angle = Math.random() * (maxAngle - minAngle) + minAngle;

  return { size, angle };
}
// CREATE MORE CONVINCING RAIN
const positionsBuffer = new Float32Array(
  Array(totalCount)
    .fill(null)
    .flatMap(() => getPosition())
);
const sizeAndAngles = Array(totalCount)
  .fill(null)
  .map(() => getRandomSize());

const Rain = (props: Props) => {
  // when a drop is instantiated, calculate its position, angle and size

  const sizesBuffer = new Float32Array([0.5]);
  //   const colorsBuffer = new Float32Array(
  //     [new Color(1, 0, 0).getRGB(), new Color(1, 0, 0).getRGB()].flat()
  //   );
  const pointsRef = useRef<PointsType>(null);

  useFrame((state) => {
    // Update position of all drops
    for (let i = 0; i < positionsBuffer.length / 3; i++) {
      const pos = positionsBuffer.slice(i * 3, i * 3 + 3);
      const size = sizeAndAngles[i].size;

      pos[0] -= ((5 * size) / 75) * speed;
      pos[1] -= Math.abs(((20 * Math.abs(size)) / 75) * speed);
      //   sizeAndAngles[i].size -= size > 1 ? 0.01 : 0;

      if (size < 0) {
        console.log({ size });
      }

      positionsBuffer[i * 3] = pos[0];
      positionsBuffer[i * 3 + 1] = pos[1];
      positionsBuffer[i * 3 + 2] = pos[2];
    }

    // replace all off-screen drops
    for (let i = 0; i < positionsBuffer.length / 3; i++) {
      const pos = positionsBuffer.slice(i * 3, i * 3 + 3);

      if (pos[0] > maxX * 1.3 || pos[1] < maxY) {
        const newPos = getPosition();
        positionsBuffer[i * 3] = newPos[0];
        positionsBuffer[i * 3 + 1] = newPos[1];
        positionsBuffer[i * 3 + 2] = newPos[2];
      }
    }
  });

  const [rainDropTexture] = useTexture(["./images/rain-drop-texture.png"]);

  return (
    <>
      <Points
        ref={pointsRef}
        positions={positionsBuffer}
        sizes={sizesBuffer}
        // colors={colorsBuffer}
        scale={0.1}
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
      >
        <pointsMaterial
          // vertexColors
          sizeAttenuation
          transparent
          size={0.07}
          color={"red"}
          alphaMap={rainDropTexture}
          alphaTest={0.001}
          depthWrite={false}
          // opacity={0.2}
          blending={AdditiveBlending}
        />
      </Points>
    </>
  );
};

export default Rain;
