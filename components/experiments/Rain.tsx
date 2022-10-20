import { Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import { AdditiveBlending, ShaderMaterial, BufferAttribute } from "three";
import "./RainMaterial";
import { RainMaterial, RainMaterialImpl } from "./RainMaterial";
import { getPosition, getRandomAngle, getRandomSize } from "./utils/rain";

type Props = {};

const totalCount = 6000;

const positionsBuffer = new Float32Array(
  Array(totalCount)
    .fill(null)
    .flatMap(() => getPosition())
);
const positionsBuffer2 = new Float32Array(
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
  const pointsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const points = pointsRef.current;
    if (!points) return;
    points.geometry.setAttribute("angle", new BufferAttribute(anglesBuffer, 1));
    points.geometry.setAttribute("size", new BufferAttribute(sizesBuffer, 1));
    points.geometry.setAttribute(
      "initPos",
      new BufferAttribute(positionsBuffer2, 3)
    );
  }, []);

  useFrame(({ clock }) => {
    if (!rainMaterialRef.current) return;
    rainMaterialRef.current.uTime = clock.getElapsedTime();
  });

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
        positions={positionsBuffer}
        scale={0.07}
        limit={totalCount} // Optional: max amount of items (for calculating buffer size)
        // range={totalCount} // Optional: draw-range
      >
        <rainMaterial
          ref={rainMaterialRef}
          key={RainMaterial.key}
          uAngle={uAngle}
          transparent
          alphaTest={0.001}
          depthWrite={false}
          blending={AdditiveBlending}
          // vertexColors
          // sizeAttenuation
          // size={0.07}
          // color={"red"}
          // opacity={0.2}
          // alphaMap={rainDropTexture}
        />
      </Points>
    </>
  );
};

export default Rain;
