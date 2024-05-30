import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Outer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & + & {
    margin-top: 25px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 3px 0;
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${theme.colors.mainBlack};
`;

const SectionRow = ({ title, icon, children }) => {
  return (
    <Outer>
      <TitleContainer>
        {icon}
        <Title>{title}</Title>
      </TitleContainer>
      {children}
    </Outer>
  );
};

export default SectionRow;
