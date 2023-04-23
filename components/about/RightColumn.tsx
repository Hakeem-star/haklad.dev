import React from "react";
import { ColumnWrapper } from "./shared";
import styled from "styled-components";
import { ColumnHeader, FancyBorderWrapper } from "./shared/ui";
import { colors } from "../../constants";

const Intro = styled.p`
  margin-bottom: 20px;
`;

const JobDetail = styled.ul`
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
    <ColumnWrapper className="rightColumn">
      <FancyBorderWrapper>
        <ColumnHeader style={{ marginBottom: 10 }}>Experience</ColumnHeader>
        <Info>
          <Intro>
            I have extensive knowledge of various aspects of web development and
            am constantly seeking to learn and enhance my skills. I held
            multiple technical roles within the digital advertising sector for
            over 5 years before transitioning to web development as a
            self-taught JavaScript developer. I possess a unique combination of
            skills that enable me to create innovative solutions for both
            clients and internal teams.
          </Intro>
          <div>
            <Job>
              NeverBland / FullStack JavaScript Developer London – January 2021
              – Present
            </Job>
            <JobDetail>
              <li>
                Working as part of a small team of under 10 developers, I had
                the opportunity to work across a wide range of web applications,
                including large-scale data aggregation apps for the medical
                industry and smaller games for Christmas.
              </li>
              <li>
                Utilized modern technologies such as React, TypeScript, Prisma,
                Framer, GraphQL, NX, and Konva to build high-quality
                applications.
              </li>
              <li>
                Leveraged Node.js and AWS to create real-time, responsive user
                interfaces and scalable backend systems.
              </li>
              <li>
                Integrated Headless CMS such as Sanity to enable content
                creators to easily manage the content of web apps.
              </li>
              <li>
                Tech: React, Typescript, Prisma, NextJS, Framer, GSAP, GraphQL,
                NX, Konva, Tailwind, Styled components, GSAP, Sanity
              </li>
            </JobDetail>
          </div>
          <div>
            <Job>
              MediaCom / Senior Technology Engineer London – March 2018 – Dec
              2020
            </Job>
            <JobDetail>
              <li>
                Troubleshot issues and improved processes to enhance workflow
                efficiency.
              </li>
              <li>
                Built a custom Chrome extension that added new features to
                DoubleClick Campaign Manager and automated various tasks using
                Google APIs.
              </li>
              <li>
                Collaborated with internal teams to identify technical
                requirements and develop customized solutions to meet business
                needs
              </li>
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
