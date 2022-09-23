import React from "react";

// inspired by - https://codepen.io/TheOnlyZac/pen/ZEoYzvx
export const generateRain = (ctx: CanvasRenderingContext2D) => {
  const minSize = 5;
  const maxSize = 40;
  const minAngle = 44.95;
  const maxAngle = 45.05;
  const speed = 1.5;
  const totalCount = 1000;
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;

  let drops: {
    update: () => void;
    draw: () => void;
    pos: number[];
  }[] = [];

  const Drop = (xpos = 0, ypos = 0, color = "#76a5d2") => {
    // set drop position
    const pos = [xpos, ypos];

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
    const angle = Math.random() * (maxAngle - minAngle) + minAngle;

    const update = () => {
      pos[0] -= ((5 * size) / 75) * speed;
      pos[1] += Math.abs(((20 * size) / 75) * speed);
      size -= 0.01;
    };

    const draw = () => {
      let startPos = pos;
      let endPos = [pos[0] - (size / 2) * Math.cos(angle), pos[1] + size];

      ctx.strokeStyle = color;
      ctx.lineWidth = size / 77;
      ctx.beginPath();
      ctx.moveTo(startPos[0], startPos[1]);
      ctx.lineTo(endPos[0], endPos[1]);
      ctx.stroke();
    };

    return {
      update,
      draw,
      pos,
    };
  };

  function newDrop(x?: number, y?: number) {
    let minX = 0;
    let maxX = winWidth * 2;
    let minY = -winHeight;
    let maxY = 0;

    let randX = Math.random() * (maxX - minX) + minX;
    let randY = Math.random() * (maxY - minY) + minY;

    let xPos = x == undefined ? randX - maxSize : x;
    let yPos = y == undefined ? randY - maxSize : y;

    return Drop(xPos, yPos);
  }

  const drawDrops = () => {
    // populate new drops if drops array is smaller than the drops total count
    for (let i = 0; i < totalCount - drops.length; i++) {
      const newD = newDrop();
      drops.push(newD);
    }

    drops.forEach(({ update, draw }, i) => {
      update();
      draw();
    });

    // remove all off-screen drops
    for (let i = drops.length - 1; i > 0; i--) {
      if (drops[i].pos[0] > winWidth * 1.3 || drops[i].pos[1] > winHeight) {
        drops.splice(i, 1);
      }
    }
  };
  return drawDrops;
};
