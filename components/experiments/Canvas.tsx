import { Canvas as ThreeCanvas } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import styled from "styled-components";
import Scene from "./Scene";
import { cameraDefaultPosition } from "./constants";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

type Props = {};

const Canvas = (props: Props) => {
  return (
    <Wrapper>
      <ThreeCanvas
        camera={{
          // @ts-ignore
          position: cameraDefaultPosition,
        }}
      >
        <Scene />
        <EffectComposer>
          <DepthOfField
            focusDistance={0.25}
            focalLength={0.6}
            bokehScale={1.3}
          />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={0.3} />
        </EffectComposer>
      </ThreeCanvas>
    </Wrapper>
  );
};

export default Canvas;
