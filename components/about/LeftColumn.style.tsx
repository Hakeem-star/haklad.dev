import styled from "styled-components";
import { colors } from "../../constants";
import { encodeSVG } from "./util";

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

export const squareCornerBorderSVG = (color: string) =>
  encodeSVG(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 32 32">
  <path d="M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z" stroke="${color}" stroke-width="3" fill="none"/>
</svg>`
  );

export const SummaryContent = styled.p`
  border: 6px solid pink;
  border-image: ${() =>
    // encoded svg - https://yoksel.github.io/url-encoder/
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'%3E%3Cpath d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='${colors.bestiary_section_border_inactive}' stroke-width='3' fill='none'/%3E%3C/svg%3E")`};
  border-image-slice: 40%;
  padding: 0 20px;
`;

export const Wrapper = styled.div`
  height: 70%;

  display: flex;
  flex-direction: column;

  padding: 5px;

  border: 2px solid pink;
  border-image: ${() =>
    `url("data:image/svg+xml,${fadedBasicBorderSvg(
      colors.bestiary_section_area_border_active
    )}")`};

  border-image-slice: 30%;

  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);

  position: relative;

  :before {
    content: "";
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    position: absolute;

    border: 5px solid pink;
    border-image: ${() =>
      `url("data:image/svg+xml,${fadedSquareCornerBorderSVG(
        colors.bestiary_section_area_border_active
      )}")`};
    border-image-slice: 40%;

    // fix to allow scrolling
    z-index: -1;
  }
`;

export const ColumnHeader = styled.p`
  padding: 10px;
  font-size: 18px;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const Details = styled.details`
  min-height: 30px;
  margin-bottom: -1px;
`;

export const DetailsItemWrapper = styled.div`
  padding: 3px 2px;
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${colors.bestiary_details_border_active};
  }
`;
export const DetailsItem = styled.div`
  height: 60px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 6px solid transparent;

  color: ${colors.bestiary_details_text};

  ${DetailsItemWrapper}:hover & {
    border-image: ${() =>
      `url("data:image/svg+xml,${squareCornerBorderSVG(
        colors.bestiary_details_border_active
      )}")`};
    border-image-slice: 40%;
  }
`;

export const FadedBackground = styled.div`
  display: flex;
  align-items: center;

  width: calc(100% + 10px);
  height: calc(100% + 10px);
  flex: none;

  padding-left: 5px;

  border: 4px solid transparent;

  border-image: ${() =>
    `url("data:image/svg+xml,${fadedHorizontalBasicBorderSvg(
      colors.bestiary_details_text_background
    )}")`};
  border-image-slice: 40%;

  background-image: linear-gradient(
    to right,
    rgba(27, 22, 3, 1) -20%,
    transparent 40%
  );
  background-repeat: no-repeat;
`;

export const Summary = styled.summary`
  position: relative;
  font-size: 20px;
  color: ${colors.witcher_text_faded};
  background: ${colors.bestiary_summary_background};

  border: 1px solid ${colors.bestiary_section_border_inactive};
  padding: 2px;

  cursor: pointer;

  :hover {
    color: ${colors.witcher_text_gold};
  }

  :before {
    content: "▼";
    font-size: 14px;

    position: absolute;
    right: 20px;

    top: 50%;
    transform: translateY(-50%);
    color: ${colors.bestiary_summary_arrow};
  }

  details[open] > & {
    :before {
      content: "▲";
      position: absolute;
      right: 20px;
      color: ${colors.bestiary_summary_arrow};
    }
  }

  ::marker {
    // hides default dropdown marker
    content: "";
  }
`;