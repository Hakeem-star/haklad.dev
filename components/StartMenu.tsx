import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const StyledLink = styled.a<{
  active?: boolean;
}>`
  color: white;
  cursor: pointer;
  width: 100%;
  position: relative;

  ${({ active }) => {
    if (!active) return;
    return css`
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
    `;
  }}
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

type Props = {
  className?: string;
  handleLinkHover: () => void;
};

const items = ["About me", "Anime Site", "Experiments"];
const StartMenu = ({ handleLinkHover, className }: Props) => {
  const [activeItem, setActiveItem] = useState("");

  const handleActiveLink = useCallback(
    (item: string) => {
      return () => {
        setActiveItem(item);
        handleLinkHover();
      };
    },
    [handleLinkHover]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const currentActiveItem = items.indexOf(activeItem);

      if (event.key === "ArrowDown") {
        if (!activeItem) {
          handleActiveLink(items[0])();
        }

        if (currentActiveItem === items.length - 1) {
          handleActiveLink(items[0])();
        } else {
          handleActiveLink(items[currentActiveItem + 1])();
        }
      }

      if (event.key === "ArrowUp") {
        if (!activeItem) {
          handleActiveLink(items[items.length - 1])();
        }

        if (currentActiveItem === 0) {
          handleActiveLink(items[items.length - 1])();
        } else {
          handleActiveLink(items[currentActiveItem - 1])();
        }
      }
    },
    [activeItem, handleActiveLink]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <nav className={className}>
      <StyledUL>
        <li>
          <Link href="/about" passHref>
            <StyledLink
              active={activeItem === "About me"}
              onMouseEnter={handleActiveLink("About me")}
            >
              About me
            </StyledLink>
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "white" }}
            href="https://anime-site-hakeem.vercel.app/"
            passHref
          >
            <StyledLink
              active={activeItem === "Anime Site"}
              onMouseEnter={handleActiveLink("Anime Site")}
              target="_blank"
            >
              Anime Site
            </StyledLink>
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} href="/experiments" passHref>
            <StyledLink
              active={activeItem === "Experiments"}
              onMouseEnter={handleActiveLink("Experiments")}
            >
              Experiments
            </StyledLink>
          </Link>
        </li>
      </StyledUL>
    </nav>
  );
};

export default StartMenu;
