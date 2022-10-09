import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Canvas from "../../components/experiments/Canvas";
import { colors } from "../../constants";

const BridgeLayer = styled.div`
  background-image: url("./images/pngfind.com-bridge-png-517681.png");
  background-repeat: no-repeat;
  background-position: 0px 102px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: 150%;
  position: absolute;
  transform: scaleX(-1);

  position: absolute;
`;

const TitleWrapper = styled.div`
  height: 70px;
  width: fit-content;
  background-color: black;

  padding: 0px 20px;

  overflow: hidden;
`;

const Title = styled.h1`
  width: fit-content;
  color: ${colors.white};
  line-height: 1;

  font-size: 44px;
`;

const BackButton = styled.button`
  position: absolute;
  bottom: 80px;
`;

const List = styled.ul`
  list-style-type: none;

  margin-top: 20px;
  margin-left: 20px;

  font-size: 34px;

  display: flex;
  flex-direction: column;
`;

const FG = styled.div`
  // whilst we position threejs
  pointer-events: none;

  width: 1350px;
  max-width: 1350px;
  height: 800px;
  margin: auto;
  padding: 0 50px;
  z-index: 1;
`;

const Item = styled.li`
  padding: 0 12px;
  width: fit-content;
  height: 50px;
  background-color: transparent;

  display: flex;
  align-items: center;

  // helps visibility whilst we have no background
  /* opacity: 0.4; */
  color: black;

  // fixes potential line height issue
  line-height: 1;

  overflow: hidden;

  &:hover {
    background-color: ${colors.black};
    opacity: 1;
    color: white;
  }

  a {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  /* background-image: url("./images/new-york-skyline.png"); */
  background-repeat: no-repeat;
  background-position: -70px 80%;
  background-size: 110%;
  display: flex;

  font-family: AmiriQuran-Regular;
`;

type Props = {};

const Experiments = (props: Props) => {
  return (
    <Wrapper>
      <Canvas />
      {/* <BridgeLayer /> */}
      <FG>
        {/* TODO - Background will use a canvas to generate rain and background image of bridge */}
        <TitleWrapper>
          <Title>Experiments</Title>
        </TitleWrapper>
        <List>
          <Item>
            <Link href="/experiments/circleEyes">Circle Eye</Link>
          </Item>
          <Item>
            <Link href="/experiments/octopus">Octopus</Link>
          </Item>
          <Item>
            <Link href="/experiments/radar">Radar</Link>
          </Item>
        </List>

        <Link href="/">
          <BackButton>Back</BackButton>
        </Link>
      </FG>
    </Wrapper>
  );
};

export default Experiments;
