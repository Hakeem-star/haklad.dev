import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { colors } from "../../constants";
import Image from "next/image";
import Linkedin from "../../pages/assets/Linkedin.svg";
import { useState } from "react";
import {
  Wrapper,
  ImageArea,
  OutboundWrapper,
  OutboundTitle,
  Outbound,
  SquareCornerWhiteHoverBlock as OutboundItem,
  SquareCornerWhiteHoverBlockBG,
  ImageWrapper,
  CodeIcon,
} from "./MiddleColumn.style";
import Link from "next/link";
import HoveredItem from "./HoveredItem";

const ImageCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {};
enum HoveredItemText {
  WORK = "Work",
  GITHUB = "Github",
  LINKEDIN = "LinkedIn",
}

const MiddleColumn = (props: Props) => {
  const [hoveredItem, setHoveredItem] = useState<"" | HoveredItemText>("");

  const unsetHoveredItem = () => {
    setHoveredItem("");
  };

  return (
    <ColumnWrapper className="middleColumn">
      <Wrapper>
        {/* Add three js canvas that allows you to change lighting on a still image
        using the normal maps
        Find product that does this */}

        <ImageArea>
          <ImageCover>
            <Image
              src="/icons/traffic-cone.png"
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </ImageCover>

          <p style={{ padding: 5 }}>Coming soon</p>
        </ImageArea>
        <OutboundWrapper>
          <OutboundTitle>{/* Text here? */}</OutboundTitle>
          <Outbound>
            <Link href="/experiments">
              <OutboundItem
                onMouseEnter={() => {
                  setHoveredItem(HoveredItemText.WORK);
                }}
                onMouseLeave={unsetHoveredItem}
              >
                <SquareCornerWhiteHoverBlockBG />
                <ImageWrapper>
                  <div>
                    <CodeIcon />
                  </div>
                </ImageWrapper>
              </OutboundItem>
            </Link>
            <a
              href="https://github.com/Hakeem-star"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OutboundItem
                onClick={() => {}}
                onMouseEnter={() => {
                  setHoveredItem(HoveredItemText.GITHUB);
                }}
                onMouseLeave={unsetHoveredItem}
              >
                <SquareCornerWhiteHoverBlockBG />
                <ImageWrapper>
                  <Image
                    src="/icons/GitHub-Mark-Light-120px-plus.png"
                    alt="Github - Hakeem-star"
                    layout="fill"
                    objectFit="cover"
                    style={{
                      // Colourise the image to match the other Icons - https://codepen.io/sosuke/pen/Pjoqqp
                      filter:
                        "invert(46%) sepia(3%) saturate(3553%) hue-rotate(2deg) brightness(86%) contrast(79%)",
                    }}
                  />
                </ImageWrapper>
              </OutboundItem>
            </a>
            <a
              href="https://www.linkedin.com/in/hakeem-ladejobi-722842102/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OutboundItem
                onClick={() => {}}
                onMouseEnter={() => {
                  setHoveredItem(HoveredItemText.LINKEDIN);
                }}
                onMouseLeave={unsetHoveredItem}
              >
                <SquareCornerWhiteHoverBlockBG />
                <ImageWrapper
                  style={{
                    padding: 8,
                  }}
                >
                  <Linkedin color={colors.witcher_text_gold} />
                </ImageWrapper>
              </OutboundItem>
            </a>
          </Outbound>

          <HoveredItem text={hoveredItem} />
        </OutboundWrapper>
      </Wrapper>
    </ColumnWrapper>
  );
};

export default MiddleColumn;
