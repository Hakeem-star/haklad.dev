import { MeshReflectorMaterial } from "@react-three/drei";
import React from "react";

type Props = {};

const River = (props: Props) => {
  return (
    <>
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 20]} />
        <MeshReflectorMaterial
          mirror={0}
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#151515"
          // metalness={0.6}
          roughness={1}
        />
      </mesh>
    </>
  );
};

export default River;
