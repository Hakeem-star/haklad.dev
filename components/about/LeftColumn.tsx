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

/* clip-path: polygon(
    50% 0%,
    98.75% 0%,
    98.75% 1.25%,
    100% 1.25%,
    100% 98.75%,
    98.75% 98.75%,
    98.75% 100%,
    1.25% 100%,
    1.25% 98.75%,
    0% 98.75%,
    0% 1.25%,
    1.25% 1.5%,
    1.25% 0%,
    50% 0%,
    50% 0.25%,
    1.5% 0.25%,
    1.5% 1.5%,
    0.25% 1.5%,
    0.25% 98.5%,
    1.5% 98.5%,
    1.5% 99.75%,
    98.5% 99.75%,
    98.5% 98.5%,
    99.75% 98.5%,
    99.75% 1.5%,
    98.5% 1.5%,
    98.5% 0.25%,
    50% 0.25%
  ); */

type Props = {};

export const LeftColumn = (props: Props) => {
  return (
    <ColumnWrapper className="leftColumn">
      <FancyBorderWrapper>
        <ColumnHeader>Skills</ColumnHeader>
        <DetailsWrapper>
          {skillData.map((data, idx) => {
            return (
              // TODO - Only open one dropdown at once
              <Details key={idx}>
                {/* TODO - Add stars to these that go away once expanded, to simulate, new item */}
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
