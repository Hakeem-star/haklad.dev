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
  attribute vec3 initPos;
  
  varying vec2 vUv;
  varying float vAngle;
  varying float vSize;
  varying float vZPos;
  
  uniform float uTime;
  
  #define PI 3.141593


  float when_gt(float x, float y) {
    return max(sign(x - y), 0.0);
  }
  
  float when_lt(float x, float y) {
    return max(sign(y - x), 0.0);
  }
  
  float and(float a, float b) {
    return a * b;
  }

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 randomPosition(){

  float minX = -100.0;
  float maxX = 100.0;

  float minY = 100.0;
  float maxY = -40.0;

  float minZ = -15.0;
  float maxZ = 40.0;



  float randX = rand(vec2(1.0,1.1)) * (maxX - minX) + minX;
  float randY = rand(vec2(1.0,1.2)) * (maxY - minY) + minY;
  float randZ = rand(vec2(1.0,1.3)) * (maxZ - minZ) + minZ;

  float xPos = randX - 1.0;
  float yPos = randY - 1.0;
  float zPos = randZ;

  return vec3(xPos,yPos,zPos);
}

  
  void main()
  {
    vUv = uv;
    vAngle = angle;
    vSize = size;
    
  
    float uSpeed = 20000.0;
    /**
     * Position
     */
  
    vec3 newPos = position;
  
    gl_PointSize = 60.0;

      
    // make it rain
    // Update position of all drops
    // By using the modulo operator, I can make it restart the animation when the x or y reaches a certain value
    
    float angleX = newPos.x * cos((PI * angle) / 180.0);
    newPos.x = angleX - mod(uTime * (vSize / 30.0 * uSpeed), 100.0);
    
    float angleY = newPos.y * sin((PI * angle) / 180.0);
    newPos.y = angleY - mod(uTime * (vSize / 30.0 * uSpeed),  600.0);
    
    vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vZPos = viewPosition.z;

    gl_Position = projectedPosition;
  
    /**
     * Size
     */
    // sizeAttenuation - (scale based on distance)
    gl_PointSize *= (1.7 / -viewPosition.z);
    // gl_PointSize *= size;
  }
  
    `,
  // fragment shader
  glsl`

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = rand(i);
  float b = rand(i + vec2(1.0, 0.0));
  float c = rand(i + vec2(0.0, 1.0));
  float d = rand(i + vec2(1.0, 1.0));

  // Smooth Interpolation

  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f*f*(3.0-2.0*f);
  // u = smoothstep(0.,1.,f);

  // Mix 4 corners percentages
  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}
  


float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

  precision mediump float;
  
  #define PI 3.141593

    uniform vec3 uColor;
    uniform float uAngle;
    uniform float uTime;

    varying vec2 vUv;
    varying vec2 vPos;
    varying float vAngle;
    varying float vSize;
    varying float vZPos;
    
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


    // create water streak
    float line = startX + startY;

    float zInd = line - clamp(vZPos, 0.0, 0.5);
    float drop = 1.0 - smoothstep(
      0.01,
      // thickness
      0.08,
      abs(zInd));


    // adds noise to taper off the lines and adds some character to the drops
    float n = noise(vec2(startX * vSize,startY * vSize));

    gl_FragColor = vec4(
      clamp(vec3(drop - n), 0.0,1.0), drop * 0.2 );
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
