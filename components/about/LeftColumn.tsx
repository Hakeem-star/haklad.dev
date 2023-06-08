import { useScrollEnd } from "../../hooks/useScrollEnd";
import {
  Details,
  DetailsItem,
  DetailsItemWrapper,
  DetailsWrapper,
  FadedBackground,
  ItemsWrapper,
  Summary,
  SummaryContent,
} from "./LeftColumn.style";
import { skillData } from "./constants";
import { ColumnWrapper } from "./shared";
import { ColumnHeader, FancyBorderWrapper } from "./shared/ui";
import styled from "styled-components";

const DetailsText = styled.p`
  font-family: Mason-Regular;
`;

type Props = {};

export const LeftColumn = (props: Props) => {
  const { ref, scrollEnded } = useScrollEnd();

  return (
    <ColumnWrapper className="leftColumn">
      <FancyBorderWrapper showFadedBottom={!scrollEnded}>
        <ColumnHeader>Skills</ColumnHeader>
        <DetailsWrapper ref={ref}>
          {skillData.map((data, idx) => {
            return (
              <Details open={!idx} key={idx}>
                <Summary>
                  <SummaryContent>{data.title}</SummaryContent>
                </Summary>
                <ItemsWrapper>
                  {data.items.map((item, idx) => (
                    <DetailsItemWrapper key={idx}>
                      <DetailsItem>
                        <FadedBackground>
                          <DetailsText>{item.text}</DetailsText>
                        </FadedBackground>
                      </DetailsItem>
                    </DetailsItemWrapper>
                  ))}
                </ItemsWrapper>
              </Details>
            );
          })}
        </DetailsWrapper>
      </FancyBorderWrapper>
    </ColumnWrapper>
  );
};
