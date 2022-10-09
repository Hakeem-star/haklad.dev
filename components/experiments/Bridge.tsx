/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export function Bridge(props: GroupProps) {
  const { nodes, materials } = useGLTF("/models/Golden Gate.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={
          // @ts-ignore
          nodes.Bridge_Golden_Gate_N260411.geometry
        }
        // material={materials["Default OBJ"]}
      >
        <meshStandardMaterial color="#2e2d2d" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Golden Gate.glb");
