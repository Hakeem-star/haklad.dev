import { MeshProps, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import "./SkyMaterial";
import { SkyMaterial, SkyMaterialImpl } from "./SkyMaterial";

const Sky = (props: MeshProps) => {
  const meshRef = useRef<SkyMaterialImpl & ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.uTime = clock.getElapsedTime();
  });
  return (
    <mesh receiveShadow castShadow visible {...props}>
      <planeGeometry args={[40, 20]} />
      <skyMaterial
        ref={meshRef}
        key={SkyMaterial.key}
        uColor={new THREE.Color("red")}
      />
    </mesh>
  );
};

export default Sky;
