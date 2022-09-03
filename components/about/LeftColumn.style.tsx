import styled from "styled-components";

export const ColumnHeader = styled.p`
  margin-bottom: 30px;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

export const Details = styled.details`
  min-height: 30px;
  vertical-align: center;
  margin-bottom: 20px;
`;

export const DetailsItem = styled.div`
  height: 60px;
  width: 100%;

  display: flex;
  align-items: center;

  border-bottom: 1px solid blue;
`;

export const Summary = styled.summary`
  position: relative;

  cursor: pointer;

  :before {
    content: "►";
    position: absolute;
    right: 20px;

    height: 140px;
  }

  details[open] > & {
    :before {
      content: "▼";
      position: absolute;
      right: 20px;
    }
  }

  ::marker {
    content: "";
  }
`;
