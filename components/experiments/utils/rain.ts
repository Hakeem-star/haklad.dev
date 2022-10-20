import { rain } from "../constants";

const { maxSize, maxAngle, minAngle, minSize } = rain;

export function getPosition() {
  let minX = -100;
  let maxX = 200;

  let minY = 100;
  let maxY = -40;

  let minZ = -15;
  let maxZ = 60;

  let randX = Math.random() * (maxX - minX) + minX;
  let randY = Math.random() * (maxY - minY) + minY;
  let randZ = Math.random() * (maxZ - minZ) + minZ;

  let xPos = randX - maxSize;
  let yPos = randY - maxSize;
  let zPos = randZ;

  return [
    Number(xPos.toFixed()),
    Number(yPos.toFixed()),
    Number(zPos.toFixed()),
  ];
}

export function getRandomAngle() {
  const angle = Math.random() * (maxAngle - minAngle) + minAngle;

  return angle;
}

export function getRandomSize() {
  // set drop size based on weighted distribution
  let sizeRange = maxSize - minSize;
  let sizeRandMin = minSize;
  let sizeRandMax = maxSize;

  let rand = Math.random();
  if (rand < 0.7) {
    // small 70%
    sizeRandMin = minSize;
    sizeRandMax = minSize + sizeRange / 3;
  } else if (rand < 0.95) {
    // medium 20%
    sizeRandMin = minSize + sizeRange / 3;
    sizeRandMax = maxSize - sizeRange / 3;
  } else {
    // large 5%
    sizeRandMin = maxSize - sizeRange / 3;
    sizeRandMax = maxSize;
  }

  let size = Math.random() * sizeRange + sizeRandMin;
  // set variation in drop angle

  return size;
}
