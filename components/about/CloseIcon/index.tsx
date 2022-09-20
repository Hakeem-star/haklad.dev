import styled from "styled-components";

import React from "react";
import { colors } from "../../../constants";
import { WitcherStyle4CornerContainer } from "../shared/WitcherStyle4CornerContainer";

const Wrapper = styled(WitcherStyle4CornerContainer)`
  width: 40px;
  height: 40px;

  transform: translateX(80%);

  align-self: start;
  margin-top: 5px;

  font-size: 22px;
  color: ${colors.witcher_text_faded};

  :hover {
    p {
      color: ${colors.white};
    }
  }
`;

type Props = {
  onClick?(): void;
};

export const CloseIcon = ({ onClick }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <p>X</p>
    </Wrapper>
  );
};
