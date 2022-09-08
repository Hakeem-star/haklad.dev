import React from "react";
import { skillData } from "./constants";
import {
  ColumnHeader,
  Details,
  DetailsItem,
  DetailsItemWrapper,
  FadedBackground,
  ItemsWrapper,
  Summary,
  SummaryContent,
  Wrapper,
} from "./LeftColumn.style";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { colors } from "../../constants";

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

const DetailsWrapper = styled.div`
  overflow: auto;
  height: 100%;
`;

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <ColumnWrapper>
      <Wrapper>
        <ColumnHeader>Skills</ColumnHeader>
        <DetailsWrapper>
          {skillData.map((data, idx) => {
            return (
              <Details key={idx}>
                {/* TODO - Add stars to these that go away once expanded, to simulate, new item */}
                <Summary>
                  <SummaryContent>{data.title}</SummaryContent>
                </Summary>
                <ItemsWrapper>
                  {data.items.map((item, idx) => (
                    <DetailsItemWrapper key={idx}>
                      <DetailsItem>
                        <FadedBackground>
                          <p>{item.text}</p>
                        </FadedBackground>
                      </DetailsItem>
                    </DetailsItemWrapper>
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
