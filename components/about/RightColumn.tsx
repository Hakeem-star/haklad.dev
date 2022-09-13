import React from "react";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { ColumnHeader, FancyBorderWrapper } from "./shared/ui";
import { colors } from "../../constants";

const Intro = styled.p`
  margin-bottom: 20px;
`;

const JobDetail = styled.p`
  width: calc(100% - 5rem);
  margin-left: 2rem;
  margin-bottom: 30px;
`;

const Job = styled.p`
  max-width: 80%;
  color: ${colors.witcher_text_brighter_gold};
  font-size: 15px;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 5px;

  color: ${colors.bestiary_details_border_active};

  > p {
    filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3));
  }
`;

const Divider = styled.span`
  width: 100%;
  height: 3px;
  border-top: 1px solid white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
`;

type Props = {};

export const RightColumn = (props: Props) => {
  return (
    <ColumnWrapper>
      <FancyBorderWrapper>
        <ColumnHeader style={{ marginBottom: 10 }}>Experience</ColumnHeader>
        <Info>
          <Intro>
            Experienced in many aspects of the web and always trying to learn
            and improve. Worked several technical roles in the digital
            advertising sector over a period of 5 years. Self-taught JavaScript
            developer with a combination of skills that allow the development of
            creative solutions for clients and internal teams.
          </Intro>
          <div>
            <Job>
              NeverBland / FullStack JavaScript Developer London – January 2021
              – Now
            </Job>
            <JobDetail>
              Building data-rich web apps using React, Typescript, Prisma &amp;
              GraphQL. Collaborating with the Client, Designers, Product
              Managers, and other Engineers to deliver compelling user-facing
              products.
            </JobDetail>
          </div>
          <div>
            <Job>
              MediaCom / Senior Technology Engineer London – March 2018 – Dec
              2020
            </Job>
            <JobDetail>
              Troubleshooting and improving processes where possible. Using
              JavaScript, I created a chrome extension we used to add
              functionalities to DoubleClick Campaign Manager as well as using
              the Google API to create other tools and automate tasks
            </JobDetail>
          </div>
          <div>
            <Job>Viant / Tech Producer November 2015 - February 2018</Job>
            <JobDetail>
              Gained a promotion from a Junior ad trafficker to becoming an
              important part of the company as a Tech producer in just over the
              space of a year through hard work and a willingness to learn.
              Assist internal teams with Ad ops, programmatic and business intel
              related issues. Provide QA support for operations Using Google Big
              Query (SQL) and Tableau to mine data as well as bridge gaps
              between data systems
            </JobDetail>
          </div>
        </Info>
      </FancyBorderWrapper>
    </ColumnWrapper>
  );
};
