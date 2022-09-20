import styled from "styled-components";
import { colors } from "../../constants";
import Code from "../../pages/assets/Code.svg";

export const CodeIcon = styled(Code)`
  transform: scale(2);
`;

export const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    > * {
      transform: translateY(-3px) scale(1.1);
    }
  }

  > * {
    transition: transform 0.2s ease-in-out;
  }
`;

// Used as a child of SquareCornerWhiteHoverBlock to create a square block with 4 corner pattern that is white when hovered
export const SquareCornerWhiteHoverBlockBG = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 1px solid ${colors.bestiary_section_border_inactive};
  position: absolute;
  inset: 0;

  ::before {
    content: "";
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    inset: 0;
    left: 1px;
    top: 1px;
    position: absolute;
    border: 6px solid pink;
    border-image: ${() =>
      // encoded svg - https://yoksel.github.io/url-encoder/
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'%3E%3Cpath d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='${colors.bestiary_section_border_inactive}' stroke-width='3' fill='none'/%3E%3C/svg%3E")`};
    border-image-slice: 40%;
  }

  // allows us to click on items above/below this
  z-index: -1;
`;

// Used in combination with SquareCornerWhiteHoverBlockBG to create a square block with 4 corner pattern that is white when hovered
export const SquareCornerWhiteHoverBlock = styled.button`
  background: transparent;
  color: inherit;
  position: relative;
  height: 55px;
  width: 55px;
  overflow: visible;
  cursor: pointer;

  :hover ${SquareCornerWhiteHoverBlockBG} {
    border: 1px solid ${colors.white};

    ::before {
      border-image-source: ${() =>
        // encoded svg - https://yoksel.github.io/url-encoder/
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'%3E%3Cpath d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='${colors.white}' stroke-width='3' fill='none'/%3E%3C/svg%3E")`};
    }
  }
`;

export const OutboundTitle = styled.p`
  font-size: 18px;
  margin-top: 20px;
  color: ${colors.white};
`;

export const OutboundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
  color: ${colors.witcher_text_gold};
`;

export const Outbound = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  padding: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;

export const ImageArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 70%;

  padding: 10px;
  background-color: #ffffff1a;
  // https://kovart.github.io/dashed-border-generator/
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='orange' stroke-width='6' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 15px;
`;
