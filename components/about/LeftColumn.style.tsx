import styled from "styled-components";
import { colors } from "../../constants";
import {
  fadedHorizontalBasicBorderSvg,
  squareCornerBorderSVG,
} from "./shared/ui";
import { encodeSVG } from "./util";

export const SummaryContent = styled.p`
  border: 6px solid transparent;
  border-image: ${() =>
    // encoded svg - https://yoksel.github.io/url-encoder/
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'%3E%3Cpath d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='${colors.bestiary_section_border_inactive}' stroke-width='3' fill='none'/%3E%3C/svg%3E")`};
  border-image-slice: 40%;
  padding: 0 20px;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const Details = styled.details`
  min-height: 30px;
  margin-bottom: -1px;

  // style the summary when the det
  &[open]:focus-within summary {
    color: ${colors.bestiary_summary_active_text};
  }
`;

export const DetailsWrapper = styled.div`
  overflow: auto;
  height: 100%;
`;

export const DetailsItemWrapper = styled.div`
  padding: 3px 2px;
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${colors.bestiary_details_border_active};
  }
  :last-child {
    margin-bottom: 5px;
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
  height: 100%;
  position: sticky;
  top: 0;

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
