import { MeshProps } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import "./SkyMaterial";
import { SkyMaterial, SkyMaterialImpl } from "./SkyMaterial";

const Sky = (props: MeshProps) => {
  return (
    <mesh visible {...props}>
      <planeGeometry args={[40, 20]} />
      <skyMaterial key={SkyMaterial.key} uColor={new THREE.Color("red")} />
    </mesh>
  );
};

export default Sky;
