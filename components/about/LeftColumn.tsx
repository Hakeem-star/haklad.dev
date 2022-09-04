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

const DetailsWrapper = styled.div`
  overflow: overlay;
  height: 100%;
`;

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <ColumnWrapper
      style={{
        height: "70%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ColumnHeader>Skills</ColumnHeader>
      <DetailsWrapper>
        {skillData.map((data) => {
          return (
            <Details>
              {/* TODO - Add stars to these that go away once expanded, to simulate, new item */}
              <Summary>{data.title}</Summary>
              <ItemsWrapper>
                {data.items.map((item) => (
                  <DetailsItem>{item.text} </DetailsItem>
                ))}
              </ItemsWrapper>
            </Details>
          );
        })}
      </DetailsWrapper>
    </ColumnWrapper>
  );
};
