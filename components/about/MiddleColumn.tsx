import React from "react";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { colors } from "../../constants";

const OutboundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
  color: ${colors.witcher_text_gold};
`;

const OutboundItem = styled.div`
  width: 55px;
  height: 55px;
  cursor: pointer;
  border: 1px solid white;

  :hover {
    border: 5px solid white;
  }
`;

const Outbound = styled.div`
  border-top: 1px solid ${colors.witcher_dull_gold};
  border-bottom: 1px solid ${colors.witcher_dull_gold};

  display: flex;
  gap: 20px;
  justify-content: center;

  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;

const ImageArea = styled.div`
  width: 99%;
  min-height: 70%;
  background: white;
  padding: 10px;
`;

type Props = {};

const MiddleColumn = (props: Props) => {
  return (
    <ColumnWrapper>
      <Wrapper>
        <ImageArea></ImageArea>
        <OutboundWrapper>
          <p style={{ fontSize: 18 }}>TEXT</p>
          <Outbound>
            <OutboundItem></OutboundItem>
            <OutboundItem></OutboundItem>
            <OutboundItem></OutboundItem>
          </Outbound>
          <p style={{ fontSize: 18 }}>TEXT</p>
          <p>TEXT</p>
        </OutboundWrapper>
      </Wrapper>
    </ColumnWrapper>
  );
};

export default MiddleColumn;
