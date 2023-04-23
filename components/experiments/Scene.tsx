import { MapControls, OrbitControls } from "@react-three/drei";
import { MapControls as MapControlsImpl } from "three-stdlib";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DirectionalLight } from "three";
import { Bridge } from "./Bridge";
import { lerp, mapLinear } from "three/src/math/MathUtils";
import Sky from "./Sky";
import Rain from "./Rain";
import Skyline from "./Skyline";
import River from "./River";
import { cameraDefaultPosition } from "./constants";
import useMousePosition from "hooks/useMousePosition";
import { useControls } from "leva";
import { useWindowSize } from "hooks/useWindowSize";
import { sizes } from "constants/breakpoints";

function Scene() {
  const { camera } = useThree();
  const { width: windowWidth } = useWindowSize();

  const isMobile = windowWidth && windowWidth <= parseInt(sizes.tablet);
  const light = useRef<DirectionalLight>(null);
  const controlsRef = useRef<MapControlsImpl>(null);

  const { x, y } = useMousePosition({
    options: { centerOrigin: true, normalise: true },
  });

  // const { disableManualCamera } = useControls({
  //   disableManualCamera: true,
  // });

  useFrame((state) => {
    if (isMobile) {
      camera.position.x = 1.89;
      camera.position.y = 0.5;
      camera.position.z = 8.73;
      return;
    }

    /* For whatever reason, state.mouse would not give me the mouse position
 when I was hovered over a html element */

    const xPos = x || 0;
    const yPos = y || 0;

    const camX = mapLinear(xPos, 0, 1, -0.1, 0.02);
    const camZ = mapLinear(yPos, 0, 1, -0.04, 0.02);

    const controls = controlsRef.current;

    if (
      !controls
      // || !disableManualCamera
    )
      return;

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
      {/* <OrbitControls /> */}
      <MapControls
        enableDamping
        dampingFactor={0.05}
        ref={controlsRef}
        // Disables the ability to move the camera
        // enabled={!disableManualCamera}
      />
      <fog attach="fog" args={["#85858a", 0.1, 10]} />
      <pointLight position={[0, -5, -10]} intensity={100.0} />
      <ambientLight color={"#4141c5"} intensity={1} />
      <hemisphereLight args={["#CEE7FC", "#183A59", 2]} />
      <directionalLight
        intensity={0.7}
        castShadow
        ref={light}
        position={[10, 10, 10]}
      />
      <Sky scale={1} position={[0, 0, -3]} />
      <Skyline />
      <River />
      <Bridge
        rotation={[0, 1.1, 0]}
        position={[-7.2, -3.6, -0.5]}
        scale={0.6}
      />
      <Rain />
    </>
  );
}

export default Scene;
