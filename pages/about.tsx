import React from "react";
import { Layout } from "../components";
import styled from "styled-components";
import MiddleColumn from "../components/about/MiddleColumn";
import { LeftColumn } from "../components/about/LeftColumn";
import { RightColumn } from "../components/about/RightColumn";

const Name = styled.h2`
  margin-top: 70px;
  margin-bottom: 60px;
  transform: translateX(50%);
  width: fit-content;
`;

const Wrapper = styled.div`
  font-family: PT Sans Regular;
  padding: 0 5em;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

// design to look like witcher beastiary page
// https://www.mobygames.com/images/shots/l/822886-the-witcher-3-wild-hunt-playstation-4-screenshot-bestiary.jpg
const Columns = styled.div`
  width: 100%;
  flex-grow: 1;
  max-height: 80%;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  grid-template-rows: 100%;
`;

type Props = {};

const About = ({}: Props) => {
  return (
    <Wrapper>
      <Name>Hakeem Ladejobi</Name>
      <Columns>
        <LeftColumn />
        <MiddleColumn />
        <RightColumn />
      </Columns>
    </Wrapper>
  );
};

export default About;
