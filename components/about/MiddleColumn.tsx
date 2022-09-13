import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { colors } from "../../constants";
import Image from "next/image";
import Code from "../../pages/assets/Code.svg";
import Linkedin from "../../pages/assets/Linkedin.svg";
import { useState } from "react";
import {
  Wrapper,
  ImageArea,
  OutboundWrapper,
  OutboundTitle,
  Outbound,
  OutboundItem,
  OutboundItemBG,
  ImageWrapper,
  CodeIcon,
} from "./MiddleColumn.style";
import Link from "next/link";
import HoveredItem from "./HoveredItem";

type Props = {};
enum HoveredItemText {
  WORK = "Work",
  GITHUB = "Github",
  LINKEDIN = "LinkedIn",
}

const MiddleColumn = (props: Props) => {
  const [hoveredItem, setHoveredItem] = useState<"" | HoveredItemText>("");

  const unsetHoveredItem = () => {
    // setHoveredItem("");
  };

  return (
    <ColumnWrapper>
      <Wrapper>
        {/* Add three js canvas that allows you to change lighting on a still image
        using the normal maps
        Find product that does this */}

        <ImageArea>
          <Image
            src="/icons/traffic-cone.png"
            alt="Picture of the author"
            width={500}
            height={500}
          />
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
                <OutboundItemBG />
                <ImageWrapper>
                  <div>
                    <CodeIcon />
                  </div>
                </ImageWrapper>
              </OutboundItem>
            </Link>
            <Link href="/experiments">
              <OutboundItem
                onClick={() => {}}
                onMouseEnter={() => {
                  setHoveredItem(HoveredItemText.GITHUB);
                }}
                onMouseLeave={unsetHoveredItem}
              >
                <OutboundItemBG />
                <ImageWrapper>
                  <Image
                    src="/icons/Octocat.png"
                    alt="Github - Hakeem-star"
                    layout="fill"
                    objectFit="cover"
                  />
                </ImageWrapper>
              </OutboundItem>
            </Link>
            <Link href="/experiments">
              <OutboundItem
                onClick={() => {}}
                onMouseEnter={() => {
                  setHoveredItem(HoveredItemText.LINKEDIN);
                }}
                onMouseLeave={unsetHoveredItem}
              >
                <OutboundItemBG />
                <ImageWrapper
                  style={{
                    padding: 8,
                  }}
                >
                  <Linkedin color={colors.witcher_text_gold} />
                </ImageWrapper>
              </OutboundItem>
            </Link>
          </Outbound>
          {
            // hoveredItem

            true && <HoveredItem text={hoveredItem} />
          }
        </OutboundWrapper>
      </Wrapper>
    </ColumnWrapper>
  );
};

export default MiddleColumn;
