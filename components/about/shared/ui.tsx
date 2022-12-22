import styled from "styled-components";
import { colors } from "../../../constants";
import { encodeSVG } from "../util";

export const fadedSquareCornerBorderSVG = (color: string) =>
  encodeSVG(
    `<svg xmlns='http://www.w3.org/2000/svg'  viewBox='-1 -1 33 33'>
<defs>
      <linearGradient id="lgrad" x1="0%" y1="0%" x2="0%" y2="90%">
          <stop offset="50%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="65%" style="stop-color:${color};stop-opacity:0" />
      </linearGradient>
</defs>
<path id='myText' d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='url(#lgrad)' stroke-width='1' fill='none'/>
</svg>`
  );

export const fadedBasicBorderSvg = (color: string) =>
  encodeSVG(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 12 12">
  <defs>
  <linearGradient id="lgrad" x1="0%" y1="0%" x2="0%" y2="90%">
  <stop offset="50%" style="stop-color:${color};stop-opacity:1" />
  <stop offset="65%" style="stop-color:${color};stop-opacity:0" />
</linearGradient>
  </defs>
<path d="m 0 10 L 0 0 l 10 0 l 0 10 Z" stroke="url(#lgrad)" stroke-width="1" fill="none"/>
</svg>`
  );

export const fadedHorizontalBasicBorderSvg = (color: string) =>
  encodeSVG(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 12 12">
  <defs>
  <linearGradient id="lgrad" x1="0%" y1="0%" x2="90%" y2="00%">
  <stop offset="50%" style="stop-color:${color};stop-opacity:1" />
  <stop offset="65%" style="stop-color:${color};stop-opacity:0" />
</linearGradient>
  </defs>
<path d="m 0 10 L 0 0 l 10 0 l 0 10 Z" stroke="url(#lgrad)" stroke-width="1" fill="none"/>
</svg>`
  );

export const squareCornerBorderSVG = (color: string, fill?: boolean) =>
  encodeSVG(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 32 32">
  <path d="M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z" stroke="${
    !fill ? color : "none"
  }" stroke-width="3" fill="${fill ? color : "none"}"/>
</svg>`
  );

export const FancyBorderWrapper = styled.div.attrs({
  className: "fancy-border-wrapper",
})`
  display: flex;
  flex-direction: column;

  padding: 9px;

  border: 2px solid transparent;
  border-image: ${() =>
    `url("data:image/svg+xml,${fadedBasicBorderSvg(
      colors.bestiary_section_area_border_active
    )}")`};

  border-image-slice: 30%;

  position: relative;

  :before {
    content: "";
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    position: absolute;

    border: 8px solid transparent;
    border-image: ${() =>
      `url("data:image/svg+xml,${fadedSquareCornerBorderSVG(
        colors.bestiary_section_area_border_active
      )}")`};
    border-image-slice: 40%;

    // fix to allow scrolling
    z-index: -1;
  }
`;

export const ColumnHeader = styled.div`
  padding: 10px;
  font-size: 18px;

  position: relative;

  border: 1px solid ${colors.bestiary_section_area_border_active};

  :before {
    content: "";
    position: absolute;
    inset: 0;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    left: 2px;
    top: 2px;
    border: 6px solid transparent;

    border-image: ${() =>
      `url("data:image/svg+xml,${squareCornerBorderSVG(
        colors.bestiary_section_area_border_active
      )}")`};
    border-image-slice: 40%;
  }
`;
