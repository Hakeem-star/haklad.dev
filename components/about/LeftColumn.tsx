import React from "react";
import { skillData } from "./constants";
import {
  ColumnHeader,
  Details,
  DetailsItem,
  ItemsWrapper,
  Summary,
} from "./LeftColumn.style";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { colors } from "../../constants";

const SummaryContent = styled.div`
  border: 6px solid pink;
  border-image: ${() =>
    // encoded svg - https://yoksel.github.io/url-encoder/
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'%3E%3Cpath d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='${colors.bestiary_section_border_inactive}' stroke-width='1' fill='none'/%3E%3C/svg%3E")`};
  border-image-slice: 40%;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  height: 70%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  padding: 5px;
  border: 1px solid ${colors.bestiary_section_border_inactive};
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.1);

  -webkit-mask-box-image: linear-gradient(white, black);

  /* mask-border-source: linear-gradient(white, black); */
  mask-type: luminance;
  position: relative;

  :before {
    content: "";
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    position: absolute;

    border: 6px solid pink;
    border-image: ${() =>
      // encoded svg - https://yoksel.github.io/url-encoder/
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'%3E%3Cdefs%3E%3ClinearGradient id='lgrad' x1='0%25' y1='60%25' x2='0%25' y2='-50%25'%3E%3Cstop offset='0%25' style='stop-color:black;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${colors.bestiary_section_border_inactive};stop-opacity:0' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath id='myText' d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='url(%23lgrad)' stroke-width='1' fill='none'/%3E%3C/svg%3E")`};
    border-image-slice: 40%;
  }

  /* clip-path: polygon(
    50% 0%,
    98.75% 0%,
    98.75% 1.25%,
    100% 1.25%,
    100% 98.75%,
    98.75% 98.75%,
    98.75% 100%,
    1.25% 100%,
    1.25% 98.75%,
    0% 98.75%,
    0% 1.25%,
    1.25% 1.5%,
    1.25% 0%,
    50% 0%,
    50% 0.25%,
    1.5% 0.25%,
    1.5% 1.5%,
    0.25% 1.5%,
    0.25% 98.5%,
    1.5% 98.5%,
    1.5% 99.75%,
    98.5% 99.75%,
    98.5% 98.5%,
    99.75% 98.5%,
    99.75% 1.5%,
    98.5% 1.5%,
    98.5% 0.25%,
    50% 0.25%
  ); */
`;

const DetailsWrapper = styled.div`
  overflow: overlay;
  height: 100%;
`;

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <ColumnWrapper>
      <Wrapper>
        <ColumnHeader>Skills</ColumnHeader>
        <DetailsWrapper>
          {skillData.map((data) => {
            return (
              <Details>
                {/* TODO - Add stars to these that go away once expanded, to simulate, new item */}
                <Summary>
                  <SummaryContent>{data.title}</SummaryContent>
                </Summary>
                <ItemsWrapper>
                  {data.items.map((item) => (
                    <DetailsItem>{item.text} </DetailsItem>
                  ))}
                </ItemsWrapper>
              </Details>
            );
          })}
        </DetailsWrapper>
      </Wrapper>
    </ColumnWrapper>
  );
};
