import React from "react";
import {
  ColumnHeader,
  Details,
  DetailsItem,
  ItemsWrapper,
  Summary,
} from "./LeftColumn.style";
import { ColumnWrapper } from "./shared";

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <ColumnWrapper style={{ height: "30%" }}>
      <ColumnHeader>Skills</ColumnHeader>
      <Details>
        <Summary>Web</Summary>
        <ItemsWrapper>
          <DetailsItem>
            This text will be hidden if your browser supports it.
          </DetailsItem>
          <DetailsItem>
            This text will be hidden if your browser supports it.
          </DetailsItem>
        </ItemsWrapper>
      </Details>

      <Details>
        <Summary>VFX</Summary>
        <ItemsWrapper>
          <DetailsItem>
            This text will be hidden if your browser supports it.
          </DetailsItem>
          <DetailsItem>
            This text will be hidden if your browser supports it.
          </DetailsItem>
        </ItemsWrapper>
      </Details>
      <Details>
        <Summary>Ad Tech</Summary>
        <ItemsWrapper>
          <DetailsItem>
            This text will be hidden if your browser supports it.
          </DetailsItem>
          <DetailsItem>
            This text will be hidden if your browser supports it.
          </DetailsItem>
        </ItemsWrapper>
      </Details>
    </ColumnWrapper>
  );
};
