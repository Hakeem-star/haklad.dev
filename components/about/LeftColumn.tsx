import { skillData } from "./constants";
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
import { ColumnWrapper } from "./shared";
import { ColumnHeader, FancyBorderWrapper } from "./shared/ui";

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <ColumnWrapper className="leftColumn">
      <FancyBorderWrapper>
        <ColumnHeader>Skills</ColumnHeader>
        <DetailsWrapper>
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
                          <p>{item.text}</p>
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
