import React from "react";
import { Layout } from "../components";
import styled from "styled-components";
import MiddleColumn from "../components/about/MiddleColumn";
import { LeftColumn } from "../components/about/LeftColumn";
import { RightColumn } from "../components/about/RightColumn";
import LevelDetails from "../components/about/LevelDetails";
import { CloseIcon } from "../components/about/CloseIcon";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 0 1rem;
`;

const Name = styled.h2`
  width: fit-content;
  align-self: flex-start;
  margin-top: 0.55rem;
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

// notes:

// Top right close button - This can lead back to the home page
// Level - keeps track of current age and the bar reflects how close it is to bday
// Weight - unsure
// Money - 5 coins
// Add page transitions -  smoke like reveal/columns animating

const About = ({}: Props) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Header>
        <Name>Hakeem Ladejobi</Name>
        {/* Include nav to go back home or maybe navigate to experiments page */}
        {/* TODO make this value dynamic based on year */}
        <LevelDetails />
        {/* <Link href="/" passHref>
          <a> */}
        <CloseIcon
          onClick={() => {
            router.push("/");
          }}
        />
        {/* </a>
        </Link> */}
      </Header>
      <Columns>
        <LeftColumn />
        <MiddleColumn />
        <RightColumn />
      </Columns>
    </Wrapper>
  );
};

export default About;
