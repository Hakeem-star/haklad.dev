// credit to - https://github.com/yoksel/url-encoder/blob/master/src/js/script.js for encoding
// credit to - https://jsfiddle.net/WF2CS/ for transparent gradient example
// credit to https://yqnn.github.io/svg-path-editor/ for creating svg
const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export function encodeSVG(svg: string) {
  return svg
    .replace(/"/g, `'`)
    .replace(/>\s{1,}</g, `><`)
    .replace(symbols, encodeURIComponent);
}
