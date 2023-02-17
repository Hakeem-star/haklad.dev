import React from "react";
import styled from "styled-components";
import { colors } from "../../../constants";
import { ColumnHeader, squareCornerBorderSVG } from "../shared/ui";
import { getAge, getDaysToNextBDay } from "./utils";

const LevelDetails = styled.div`
  display: flex;
  align-items: center;
`;

const BarProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const LevelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const LevelProgress = styled.div``;

const LevelBar = styled(ColumnHeader)`
  width: 200px;
  max-width: 450px;

  position: relative;

  ::before {
    border-width: 3px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    left: 1px;
    top: 1px;
  }
  ::after {
    content: "";
    position: absolute;
    inset: 0;
    top: 5.5px;
    left: 5.5px;

    width: calc(
      ${() => {
          const daysInYear = 365;
          const daysToNextBday = getDaysToNextBDay();

          return (
            (((daysInYear - daysToNextBday) / daysInYear) * 100).toFixed() + "%"
          );
        }} - 11px
    );
    height: calc(100% - 11px);

    border: 2px solid transparent;
    border-image: ${() =>
      `url("data:image/svg+xml,${squareCornerBorderSVG("white", true)}") `};

    border-image-slice: 40% fill;

    filter: drop-shadow(0 0px 6px #fff);
  }
`;

const Level = styled.h2`
  font-size: 2rem;
`;

const LevelLabel = styled.h2`
  margin-bottom: auto;
  margin-right: 30px;
  margin-top: 4px;

  font-size: 1.2rem;
  color: ${colors.witcher_text_faded};
`;

type Props = {};
const index = (props: Props) => {
  const age = getAge();
  const daysToNextBday = getDaysToNextBDay();

  return (
    <LevelDetails>
      <LevelLabel>Level</LevelLabel>
      <LevelWrapper>
        <Level>{age}</Level>
        <BarProgress>
          <LevelBar />
          <LevelProgress>{365 - daysToNextBday}/365</LevelProgress>
        </BarProgress>
      </LevelWrapper>
    </LevelDetails>
  );
};

export default index;
