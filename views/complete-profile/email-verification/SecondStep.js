import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${theme.colors.mainBlack};
`;

const SecondStep = ({ pageTranslations }) => {
  const { verifyEmailTitle } = pageTranslations;
  return (
    <Container>
      <Title>Email sent</Title>
      <p>Please check your email</p>
    </Container>
  );
};

export default SecondStep;
