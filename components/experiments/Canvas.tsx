import {
  Environment,
  MapControlsProps,
  MeshReflectorMaterial,
  useTexture,
  MapControls,
} from "@react-three/drei";
import { MapControls as MapControlsImpl } from "three-stdlib";
import { Canvas as ThreeCanvas, useFrame, useThree } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DirectionalLight, Vector3, WebGLCubeRenderTarget } from "three";
import { Bridge } from "./Bridge";
import { lerp, mapLinear } from "three/src/math/MathUtils";
import Rain from "./Rain";

const cameraDefaultPosition = [0, 0, 5];

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const CanvasWrapper = styled.canvas`
  position: fixed;
  inset: 0;
`;

function drawSkyline(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const ratio = img.width / img.height;
  const width = 1800;

  ctx?.drawImage(img, 300, 250, width, width / ratio);
}
function drawBridge(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const ratio = img.width / img.height;
  const width = 2400;
  ctx.save(); // save the current canvas state
  ctx.translate(window.innerWidth, 0);

  ctx.scale(-1, 1);

  ctx?.drawImage(img, 300, 120, width, width / ratio);
  ctx.restore(); // restore the state as it was when this function was called
}

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

function Scene() {
  const { gl, scene, camera } = useThree();
  const { panX, panZ } = useControls({
    panX: {
      min: -0.15,
      max: 0.15,
      value: 0,
    },
    panZ: {
      min: -0.0025,
      max: 0.0025,
      value: 0.001,
    },
  });

  useTexture("./images/rural_winter_roadside.jpg", (textures) => {
    const skyBoxTexture = Array.isArray(textures) ? textures[0] : textures;

    const rt = new WebGLCubeRenderTarget(skyBoxTexture.image.height);
    rt.fromEquirectangularTexture(gl, skyBoxTexture);
    // scene.background = rt.texture;
  });

  const [skyline] = useTexture(["./images/new-york-skyline-edited.png"]);

  const skylineRatio = skyline.image.width / skyline.image.height;
  const light = useRef<DirectionalLight>(null);
  const controlsRef = useRef<MapControlsImpl>(null);

  useFrame((state) => {
    // mouse values are 0 - 1
    const xPos = state.mouse.x;
    const yPos = state.mouse.y;

    const camX = mapLinear(xPos, 0, 1, -0.1, 0.02);
    const camZ = mapLinear(yPos, 0, 1, -0.04, 0.02);

    const controls = controlsRef.current;
    if (!controls) return;

    // ease the movement of the camera
    controls.target.x = lerp(controls.target.x, camX, 0.1);
    camera.position.x = lerp(camera.position.x, camX, 0.1);

    controls.target.z = lerp(controls.target.z, camZ, 0.1);
    camera.position.z = lerp(
      camera.position.z,
      cameraDefaultPosition[2] + camZ,
      0.1
    );
  });

  return (
    <>
      <MapControls
        enableDamping
        dampingFactor={0.05}
        ref={controlsRef}
        // enabled={false}
      />
      <fog attach="fog" args={["#b9b9b9", 1, 20]} />
      <ambientLight intensity={1} />

      <directionalLight
        intensity={0.7}
        castShadow
        ref={light}
        position={[10, 10, 10]}
      />

      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[20, 20 / skylineRatio]} />
        {/* meshBasicMaterial is not affected by lights (need to give it it's own lighting) */}
        <meshBasicMaterial map={skyline} transparent />
      </mesh>

      <Bridge
        rotation={[0, 1.1, 0]}
        position={[-7.2, -3.6, -0.5]}
        scale={0.6}
      />

      {/* reflective water */}
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
      <Rain />
    </>
  );
}

export default Canvas;
