import styled from "styled-components";
import { colors } from "../../constants";

export const ColumnHeader = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

export const Details = styled.details`
  min-height: 30px;
  margin-bottom: 20px;
`;

export const DetailsItem = styled.div`
  height: 60px;
  width: calc(100% - 5px);
  margin-left: auto;

  display: flex;
  align-items: center;

  border-top: 1px solid ${colors.witcher_dull_gold};
  border-bottom: 1px solid ${colors.witcher_dull_gold};

  :hover {
    color: ${colors.witcher_text_brighter_gold};
  }
`;

export const Summary = styled.summary`
  position: relative;
  font-size: 20px;
  color: ${colors.witcher_text_faded};

  border: 1px solid ${colors.bestiary_section_border_inactive};
  padding: 2px;

  cursor: pointer;

  :hover {
    color: ${colors.witcher_text_gold};
  }

  :before {
    content: "▼";
    font-size: 14px;

    position: absolute;
    right: 20px;

    top: 50%;
    transform: translateY(-50%);
  }

  details[open] > & {
    :before {
      content: "▲";
      position: absolute;
      right: 20px;
    }
  }

  ::marker {
    content: "";
  }
`;
