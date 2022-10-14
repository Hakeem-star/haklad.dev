import { Point, Points, shaderMaterial, useTexture } from "@react-three/drei";
import {
  extend,
  PointsProps,
  ReactThreeFiber,
  useFrame,
} from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  Blending,
  CompressedPixelFormat,
  Color,
  Points as PointsType,
  ShaderMaterial,
  BufferAttribute,
} from "three";
import "./RainMaterial";
import { RainMaterial, RainMaterialImpl } from "./RainMaterial";

type Props = {};

const minSize = 0.2;
const maxSize = 1;
const minAngle = 44.95;
const maxAngle = 65.05;
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

function getRandomAngle() {
  const angle = Math.random() * (maxAngle - minAngle) + minAngle;

  return angle;
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

  return size;
}
// CREATE MORE CONVINCING RAIN
const positionsBuffer = new Float32Array(
  Array(totalCount)
    .fill(null)
    .flatMap(() => getPosition())
);
const anglesBuffer = new Float32Array(
  Array(totalCount)
    .fill(null)
    .map(() => getRandomAngle())
);

const sizesBuffer = new Float32Array(
  Array(totalCount)
    .fill(null)
    .map(() => getRandomSize())
);

const Rain = (props: Props) => {
  const rainMaterialRef = useRef<ShaderMaterial & RainMaterialImpl>(null);
  const pointsRef = useRef<any>(null);
  // when a drop is instantiated, calculate its position, angle and size

  //   const colorsBuffer = new Float32Array(
  //     [new Color(1, 0, 0).getRGB(), new Color(1, 0, 0).getRGB()].flat()
  //   );

  useEffect(() => {
    const points = pointsRef.current;
    if (!points) return;
    points.geometry.setAttribute("angle", new BufferAttribute(anglesBuffer, 1));
    points.geometry.setAttribute("size", new BufferAttribute(sizesBuffer, 1));
    console.log(points);
  }, []);

  useFrame(({ clock }) => {
    if (!rainMaterialRef.current) return;
    rainMaterialRef.current.uTime = clock.getElapsedTime();

    // Update position of all drops
    // for (let i = 0; i < positionsBuffer.length / 3; i++) {
    //   const pos = positionsBuffer.slice(i * 3, i * 3 + 3);
    //   const size = sizeAndAngles[i].size;

    //   pos[0] -= ((5 * size) / 75) * speed;
    //   pos[1] -= Math.abs(((20 * Math.abs(size)) / 75) * speed);
    //   //   sizeAndAngles[i].size -= size > 1 ? 0.01 : 0;

    //   if (size < 0) {
    //     console.log({ size });
    //   }

    //   positionsBuffer[i * 3] = pos[0];
    //   positionsBuffer[i * 3 + 1] = pos[1];
    //   positionsBuffer[i * 3 + 2] = pos[2];
    // }

    // replace all off-screen drops
    // for (let i = 0; i < positionsBuffer.length / 3; i++) {
    //   const pos = positionsBuffer.slice(i * 3, i * 3 + 3);

    //   if (pos[0] > maxX * 1.3 || pos[1] < maxY) {
    //     const newPos = getPosition();
    //     positionsBuffer[i * 3] = newPos[0];
    //     positionsBuffer[i * 3 + 1] = newPos[1];
    //     positionsBuffer[i * 3 + 2] = newPos[2];
    //   }
    // }
  });

  const [rainDropTexture] = useTexture(["./images/rain-drop-texture.png"]);

  const { uAngle } = useControls({
    uAngle: {
      min: 0.0,
      max: 360.0,
      value: 0.0,
      step: 0.1,
    },
  });

  return (
    <>
      <Points
        ref={pointsRef}
        // @ts-ignore
        test={positionsBuffer}
        // ref={pointsRef}
        positions={positionsBuffer}
        // sizes={sizesBuffer}
        // colors={colorsBuffer}
        scale={0.07}
        limit={totalCount} // Optional: max amount of items (for calculating buffer size)
        range={totalCount} // Optional: draw-range
      >
        <rainMaterial
          ref={rainMaterialRef}
          key={RainMaterial.key}
          uAngle={uAngle}
          // vertexColors
          // sizeAttenuation
          // size={0.07}
          // color={"red"}
          // opacity={0.2}
          transparent
          // alphaMap={rainDropTexture}
          // alphaTest={0.001}
          depthWrite={false}
          // blending={AdditiveBlending}
        />
      </Points>
    </>
  );
};

export default Rain;
