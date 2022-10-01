/* With help from https://www.ozoneasylum.com/30982 
& https://github.com/cpetry/TextureGenerator-Online/blob/de8dbab3db62f19d14c5778d9399351d96bb589d/javascript/tex_perlin_noise.js */
function randomNoise(
  canvas: HTMLCanvasElement,
  x = 0,
  y = 0,
  col1: Record<"r" | "g" | "b", number> = { r: 0, g: 0, b: 0 },
  col2: Record<"r" | "g" | "b", number> = { r: 255, g: 255, b: 255 }
) {
  let width = canvas.width;
  let height = canvas.height;
  let alpha = 255;

  const g = canvas.getContext("2d");
  if (!g) return;
  let imageData = g.getImageData(x, y, width, height);
  let pixels = imageData.data;
  let n = pixels.length;
  let i = 0;

  while (i < n) {
    const rr = Math.random();
    // r
    pixels[i++] = rr * col1.r + (1.0 - rr) * col2.r;
    // g
    pixels[i++] = rr * col1.g + (1.0 - rr) * col2.g;
    // b
    pixels[i++] = rr * col1.b + (1.0 - rr) * col2.b;
    // a
    pixels[i++] = alpha;
  }
  g.putImageData(imageData, x, y);
  return canvas;
}

export function perlinNoise(
  canvas: HTMLCanvasElement,
  col1: Record<"r" | "g" | "b", number> = { r: 0, g: 0, b: 0 },
  col2: Record<"r" | "g" | "b", number> = { r: 255, g: 255, b: 255 },
  scaleY: number = 1,
  scaleX: number = 1
) {
  let noise = randomNoise(canvas, 0, 0, col1, col2);
  if (!noise) return;
  const g = canvas.getContext("2d");
  if (!g) return;

  g.save();

  /* Scale random iterations onto the canvas to generate Perlin noise. */
  for (let size = 20; size <= noise.width; size *= 3) {
    let x = (Math.random() * (noise.width - size)) | 0;
    let y = (Math.random() * (noise.height - size)) | 0;
    g.globalAlpha = 12 / size;
    g.drawImage(
      noise,
      x,
      y,
      size * scaleY,
      size * scaleX,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  g.restore();

  return canvas;
}
