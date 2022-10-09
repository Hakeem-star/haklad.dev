import {
  Environment,
  MapControlsProps,
  MeshReflectorMaterial,
  useTexture,
  MapControls,
} from "@react-three/drei";
import { MapControls as MapControlsImpl } from "three-stdlib";
import { Canvas as ThreeCanvas, useThree } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { DirectionalLight, Vector3, WebGLCubeRenderTarget } from "three";
import { Bridge } from "./Bridge";

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
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const bridgeRef = useRef<HTMLImageElement | null>(null);
  // const skylinesRef = useRef<HTMLImageElement | null>(null);

  // const getContext = () => {
  //   const canvas = canvasRef.current;

  //   const ctx = canvas?.getContext("2d");
  //   return ctx;
  // };

  // // setup
  // useEffect(() => {
  //   const ctx = getContext();
  //   if (!ctx) return;

  //   ctx.canvas.width = window.innerWidth;
  //   ctx.canvas.height = window.innerHeight;
  //   let x = window.innerWidth / 2;
  //   let y = ctx.canvas.height / 2;
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // }, []);

  // // clouds
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   perlinNoise(
  //     canvas,
  //     { r: 0, g: 0, b: 0 },
  //     { r: 119, g: 200, b: 255 },
  //     1,
  //     1.4
  //   );
  // }, []);

  // // skyline
  // useEffect(() => {
  //   const ctx = getContext();
  //   if (!ctx) return;

  //   const img = new Image();
  //   img.onload = () => {
  //     skylinesRef.current = img;

  //     drawSkyline(ctx, img);
  //   };
  //   img.src = "./images/new-york-skyline.png";

  //   return () => {};
  // }, []);

  // // bridge
  // useEffect(() => {
  //   const ctx = getContext();
  //   if (!ctx) return;

  //   const img = new Image();

  //   img.onload = () => {
  //     bridgeRef.current = img;

  //     drawBridge(ctx, img);
  //   };
  //   img.src = "./images/pngfind.com-bridge-png-517681.png";

  //   return () => {};
  // }, []);

  //   // rain
  //   useEffect(() => {
  //     const ctx = getContext();
  //     if (!ctx) return;

  //     const rain = generateRain(ctx);

  //     const run = () => {
  //       // clear canvas
  //       //   ctx.fillStyle = "white";
  //       ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //       if (skylinesRef.current) {
  //         drawSkyline(ctx, skylinesRef.current);
  //       }
  //       if (bridgeRef.current) {
  //         drawBridge(ctx, bridgeRef.current);
  //       }
  //       rain();
  //       requestAnimationFrame(run);
  //     };

  //     run();
  //   }, []);

  // var geometry = new THREE.SphereGeometry(0.5, 32, 32);
  // var texture = new THREE.TextureLoader().load( "data:image/jpeg;base64,/9j/4AAQSkZJRgA--(truncated-for-example)--BAgEASABIAAD" );
  // var material = new THREE.MeshBasicMaterial( { map: texture } );
  // var mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  // const { focusDistance, focalLength, bokehScale } = useControls({
  //   focusDistance: {
  //     min: 0,
  //     max: 4,
  //     value: 2,
  //   },
  //   focalLength: {
  //     min: 0,
  //     max: 1,
  //     value: 0.1,
  //   },
  //   bokehScale: {
  //     min: 0,
  //     max: 10,
  //     value: 2,
  //   },
  // });

  return (
    <Wrapper>
      <ThreeCanvas camera={{ position: cameraDefaultPosition }}>
        <Scene />
        <EffectComposer>
          <DepthOfField
            focusDistance={0.25}
            focalLength={0.6}
            bokehScale={1.3}
          />
          {/* <Noise opacity={0.02} /> */}
          {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
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

  // useEffect(() => {
  //   camera.position.setX(panX);
  //   camera.position.setZ(panZ);
  // }, [camera, panX, panZ]);

  const skyBox = useTexture(
    "./images/rural_winter_roadside.jpg",
    (textures) => {
      const skyBoxTexture = Array.isArray(textures) ? textures[0] : textures;

      const rt = new WebGLCubeRenderTarget(skyBoxTexture.image.height);
      rt.fromEquirectangularTexture(gl, skyBoxTexture);
      scene.background = rt.texture;
    }
  );

  const [skyline, bridge] = useTexture(
    [
      "./images/new-york-skyline-edited.png",
      "./images/pngfind.com-bridge-png-517681.png",
      "./images/rural_winter_roadside.jpg",
    ],
    (textures) => {
      if (Array.isArray(textures)) {
        const skyBoxTexture = textures[2];

        const rt = new WebGLCubeRenderTarget(skyBoxTexture.image.height);
        rt?.fromEquirectangularTexture(gl, skyBoxTexture);
        scene.background = rt.texture;
      }
    }
  );

  const skylineRatio = skyline.image.width / skyline.image.height;
  const bridgeRatio = bridge.image.width / bridge.image.height;
  const light = useRef<DirectionalLight>(null);
  const controlsRef = useRef<MapControlsImpl>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    controls?.addEventListener("change", function () {
      if (controls.target.x < -0.15) {
        controls.target.x = -0.15;
        camera.position.x = -0.15;
      } else if (controls.target.x > 0.15) {
        controls.target.x = 0.15;
        camera.position.x = 0.15;
      }

      if (controls.target.z < -0.02) {
        controls.target.z = -0.02;
        camera.position.z = cameraDefaultPosition[2] + -0.02;
      } else if (controls.target.z > 0.02) {
        controls.target.z = 0.02;
        camera.position.z = cameraDefaultPosition[2] + 0.02;
      }
    });
  }, []);
  return (
    <>
      <MapControls
        enableDamping
        dampingFactor={0.05}
        ref={controlsRef}
        enableRotate={false}
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
    </>
  );
}

export default Canvas;
