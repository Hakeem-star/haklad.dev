import React from "react";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";

const OutboundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
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
  border-top: 1px solid red;
  border-bottom: 1px solid red;

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
  height: 70%;
  width: 99%;
  background: white;
  margin: auto;
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
