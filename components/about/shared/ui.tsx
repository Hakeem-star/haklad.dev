import styled from "styled-components";
import { colors } from "../../../constants";
import {
  fadedBasicBorderSvg,
  fadedSquareCornerBorderSVG,
  squareCornerBorderSVG,
} from "../LeftColumn.style";

export const FancyBorderWrapper = styled.div`
  height: 70%;

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
