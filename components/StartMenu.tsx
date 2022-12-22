import Link from "next/link";
import React from "react";
import styled from "styled-components";

const StartButton = styled.h2`
  cursor: pointer;
`;

const VolumeContainer = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 25px;
`;

const StyledLink = styled.a`
  color: white;
  cursor: pointer;
  width: 100%;
  position: relative;

  &:hover {
    text-decoration: underline;
    color: red;

    :after {
      content: "";
      position: absolute;
      inset: 0;
      // 50px = hand cursor width
      left: -60px;
      top: 6px;
      background: url("./FF7Cursor.webp") no-repeat;
      background-size: contain;
      width: 50px;
    }
  }
`;

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 5px;

  li {
    display: flex;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(transparent, black), transparent;
`;

const H1 = styled.h1`
  user-select: none;
  position: relative;
  color: white;
  &::after {
    content: "";
  }
`;

type Props = {
  className?: string;
  handleLinkHover: () => void;
};

const StartMenu = ({ handleLinkHover, className }: Props) => {
  return (
    <nav className={className}>
      <StyledUL>
        <li>
          <Link href="/about" passHref>
            <StyledLink onMouseEnter={handleLinkHover}>About me</StyledLink>
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "white" }}
            href="https://anime-site-hakeem.vercel.app/"
            passHref
          >
            <StyledLink onMouseEnter={handleLinkHover} target="_blank">
              Anime Site
            </StyledLink>
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} href="/experiments" passHref>
            <StyledLink onMouseEnter={handleLinkHover}>Experiments</StyledLink>
          </Link>
        </li>
      </StyledUL>
    </nav>
  );
};

export default StartMenu;
