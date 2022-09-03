import React from "react";
import { Layout } from "../components";
import styled from "styled-components";
import MiddleColumn from "../components/about/MiddleColumn";
import { LeftColumn } from "../components/about/LeftColumn";
import { RightColumn } from "../components/about/RightColumn";

// design to look like witcher beastiary page
// https://www.mobygames.com/images/shots/l/822886-the-witcher-3-wild-hunt-playstation-4-screenshot-bestiary.jpg
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 5em;
  padding-top: 10em;

  display: grid;
  grid-template-columns: repeat(3, 3fr);
`;

type Props = {};

const About = ({}: Props) => {
  return (
    <Wrapper>
      <LeftColumn />
      <MiddleColumn />
      <RightColumn />
    </Wrapper>
  );
};

export default About;
