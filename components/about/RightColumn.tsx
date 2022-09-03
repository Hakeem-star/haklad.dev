import React from "react";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Divider = styled.span`
  width: 100%;
  height: 3px;
  border-top: 1px solid white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {};

export const RightColumn = (props: Props) => {
  return (
    <ColumnWrapper>
      <Wrapper>
        <p style={{ marginBottom: 20 }}>RightColumn</p>
        <Divider />
        <Info>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nihil
            nulla!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            distinctio eius officia, esse ipsum optio accusamus qui voluptatum
            veniam accusantium adipisci neque hic rerum, laborum nostrum error
            natus vel libero?
          </p>
        </Info>
      </Wrapper>
    </ColumnWrapper>
  );
};
