export function blurCanvas(ctx: CanvasRenderingContext2D) {
  const blur = 8; // ガウスぼかし半径
  var blurRange = blur * 3; // ガウス分布 σ
  var gaussparam: number[] = new Array(); // ガウス分布係数
  //ガウス分布配列作成
  for (var i = 0; i <= blurRange; i++) {
    gaussparam[i] = Math.exp((-i * i) / (2 * blur * blur));
  }

  // setting
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);
  let newData: number[];
  let newImageData;
  // blur y
  newData = switchXY(width, height, imageData.data, true);
  newImageData = blurX(ctx, newData);
  // blur x
  newData = switchXY(width, height, newImageData.data, false);
  newImageData = blurX(ctx, newData);
  // draw
  ctx.putImageData(newImageData, 0, 0);
}

export function blurX(
  ctxDraw: CanvasRenderingContext2D,
  dataOrigine: number[]
) {
  const width = ctxDraw.canvas.width;
  const height = ctxDraw.canvas.height;

  var imageDataDraw = ctxDraw.getImageData(0, 0, width, height);
  var dataDraw = imageDataDraw.data;
  var ox, oy, gauss, count, R, G, B, A;
  for (var i = 0, len = width * height; i < len; i++) {
    gauss = count = R = G = B = A = 0;
    ox = i % width;
    oy = (i / width) | 0; // = Math.floor(i / width);
    for (var x = -1 * blurRange; x <= blurRange; x++) {
      var tx = ox + x;
      if (0 <= tx && tx < width) {
        gauss = gaussparam[x < 0 ? -x : x]; // = [Math.abs(x)]
        var k = i + x;
        R += dataOrigine[k * 4 + 0] * gauss;
        G += dataOrigine[k * 4 + 1] * gauss;
        B += dataOrigine[k * 4 + 2] * gauss;
        A += dataOrigine[k * 4 + 3] * gauss;
        count += gauss;
      }
    }
    dataDraw[i * 4 + 0] = (R / count) | 0;
    dataDraw[i * 4 + 1] = (G / count) | 0;
    dataDraw[i * 4 + 2] = (B / count) | 0;
    dataDraw[i * 4 + 3] = (A / count) | 0;
  }
  return imageDataDraw;
}
function switchXY(width, height, data, clockwiseFlg) {
  // 行列入れ替え
  var newData = new Array();
  if (clockwiseFlg) {
    for (var i = 0, len = width * height; i < len; i++) {
      var k = (i % width) * height + ((i / width) | 0);
      newData[k * 4] = data[i * 4];
      newData[k * 4 + 1] = data[i * 4 + 1];
      newData[k * 4 + 2] = data[i * 4 + 2];
      newData[k * 4 + 3] = data[i * 4 + 3];
    }
  } else {
    for (var i = 0, len = width * height; i < len; i++) {
      var k = (i % width) * height + ((i / width) | 0);
      newData[i * 4] = data[k * 4];
      newData[i * 4 + 1] = data[k * 4 + 1];
      newData[i * 4 + 2] = data[k * 4 + 2];
      newData[i * 4 + 3] = data[k * 4 + 3];
    }
  }
  return newData;
}
