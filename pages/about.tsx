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
import { device } from "constants/breakpoints";
import { colors } from "constants/colors";

const OutboundLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-inline: 10px;
  align-self: start;

  color: ${colors.witcher_text_faded};

  a:hover {
    color: white;
  }

  @media ${device.desktop} {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  .closeIconWrapper {
    display: none;
  }

  @media ${device.desktop} {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 70px;
    margin-bottom: 60px;
    padding: 0 20px;
    gap: 30px;
    .closeIconWrapper {
      display: block;
    }

    .levelDetailsWrapper {
      margin-left: auto;
    }
  }
`;

const Name = styled.h2`
  width: fit-content;
  align-self: flex-start;
  /* margin-top: 0.55rem; */
  cursor: pointer;
  font-family: TheWitcher;
  letter-spacing: 2px;
`;

const Wrapper = styled.div`
  font-family: PT Sans Regular;

  padding: 0 2vw;

  display: flex;
  flex-direction: column;

  @media ${device.desktop} {
    padding: 0 10px;
    height: 100%;
    overflow: hidden;
  }
`;

// design to look like witcher beastiary page
// https://www.mobygames.com/images/shots/l/822886-the-witcher-3-wild-hunt-playstation-4-screenshot-bestiary.jpg
const Columns = styled.div`
  width: 100%;
  flex-grow: 1;
  max-height: 80%;
  display: grid;

  .middleColumn {
    display: none;
  }

  .fancy-border-wrapper {
    height: 100%;
  }

  .leftColumn {
    margin-bottom: 50px;
    height: 370px;
  }

  @media ${device.desktop} {
    padding: 0 10px;
    grid-template-columns: repeat(3, 3fr);
    grid-template-rows: 100%;

    .leftColumn {
      margin-bottom: 0px;
      height: auto;
    }

    .middleColumn {
      display: block;
    }

    .fancy-border-wrapper {
      height: 70%;
    }
  }
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
        <Link href="/" passHref>
          <a>
            <Name>Hakeem Ladejobi</Name>
          </a>
        </Link>
        {/* Include nav to go back home or maybe navigate to experiments page */}
        {/* TODO make this value dynamic based on year */}
        <div className="levelDetailsWrapper">
          <LevelDetails />
        </div>

        <OutboundLinks>
          <p>Why don&apos;t you also check out my -</p>
          <Link href="/experiments">- Experiments</Link>
          <a
            href="https://github.com/Hakeem-star"
            target="_blank"
            rel="noopener noreferrer"
          >
            - Github
          </a>
          <a
            href="https://github.com/Hakeem-star"
            target="_blank"
            rel="noopener noreferrer"
          >
            - LinkedIn
          </a>
        </OutboundLinks>
        <div className="closeIconWrapper">
          <CloseIcon
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
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
