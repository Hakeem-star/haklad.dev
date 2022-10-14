import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, Texture } from "three";
const glsl = (x: any) => `${x}`;

export const RainMaterial = shaderMaterial(
  { uColor: new Color(0.2, 0.0, 0.1), uAngle: 0, uSpeed: 1.2, uTime: 0 },
  // vertex shader
  glsl`

    attribute float angle;
    attribute float size;

    varying vec2 vUv;
    varying float vAngle;
    varying float vSize;

    uniform float uTime;

      void main()
      {
        vUv = uv;
        vAngle = angle;
        vSize = size;

       float uSpeed = 20.0;
          /**
           * Position
           */
          vec4 modelPosition = modelMatrix * vec4(position,1.0);
          vec4 viewPosition = viewMatrix * modelPosition;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);



      // // Reset position of drops not in view
      //   if(
      //     gl_Position.x > 4.5 ||
      //      gl_Position.y < -4.0
      //       ){

      //     gl_Position.x = 50.0;     
      //     gl_Position.y = 0.0;     

      //   }

              // make it rain
      // Update position of all drops
      gl_Position.x -= uTime * ((5.0 * 1.0) / 75.0) * uSpeed;
      gl_Position.y -= uTime * abs(((20.0 * abs(1.0)) / 75.0) * uSpeed);
      

          /**
           * Size
           */
          gl_PointSize = 60.0;

          // sizeAttenuation - (scale based on distance)
          gl_PointSize *= (1.7 / -viewPosition.z);
          // gl_PointSize *= size;
  
      }
    `,
  // fragment shader
  glsl`
  precision mediump float;
  
  #define PI 3.141593

    uniform vec3 uColor;
    uniform float uAngle;
    uniform float uTime;

    varying vec2 vUv;
    varying vec2 vPos;
    varying float vAngle;
    varying float vSize;
    
    void main()
    {
   
    float minAngle = -20.0;
    float maxAngle = 20.0;
    float startAngle = maxAngle;

// control length

    // maps it to a range of -1 to 1
    vec2 normalizedXY = (gl_PointCoord - 0.5) * 2.0;

    float startX = normalizedXY.x * cos((PI * vAngle) / 180.0);
    float startY = normalizedXY.y * sin((PI * vAngle) / 180.0);


    // Taper Top
      float taper = 
      // 0 - 1 
      ((gl_PointCoord.y)) +
      abs(normalizedXY.x)
      ;


    // create water streak
    float line = startX + startY;
    float drop = 1.0 - smoothstep(
    
      0.01,
      // thickness
      0.2,
      abs(line));
    float alpha =  drop;



    gl_FragColor = vec4(vec3(
      drop
    ), 
    clamp(alpha - 0.3, 0.0,1.0)
    );

    }`
);

export type RainMaterialImpl = {
  uColor?: typeof Color;
  uTime?: number;
  uAngle?: number;
  uSpeed?: number;
} & JSX.IntrinsicElements["shaderMaterial"];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      rainMaterial: RainMaterialImpl;
    }
  }
}

extend({ RainMaterial });
