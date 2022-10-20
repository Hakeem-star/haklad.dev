import { useTexture } from "@react-three/drei";
import React from "react";

type Props = {};

const Skyline = (props: Props) => {
  const [skyline] = useTexture(["./images/new-york-skyline-edited.png"]);

  const skylineRatio = skyline.image.width / skyline.image.height;

  return (
    <>
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[20, 20 / skylineRatio]} />
        {/* meshBasicMaterial is not affected by lights (need to give it it's own lighting) */}
        <meshBasicMaterial map={skyline} transparent />
      </mesh>
    </>
  );
};

export default Skyline;
