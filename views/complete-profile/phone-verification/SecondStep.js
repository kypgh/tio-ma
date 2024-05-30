import React from "react";
import styled from "styled-components";
import OtpInput from "../../../components/OtpInput";
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

const SecondStep = ({
  onBack,
  onSubmit,
  isLoading = false,
  errorMessage,
  pageTranslations,
}) => {
  const { verifyPhoneNumberTitle } = pageTranslations;
  return (
    <Container>
      <Title>{verifyPhoneNumberTitle}</Title>
      {errorMessage && <p>{errorMessage}</p>}
      <OtpInput onBack={onBack} onSubmit={onSubmit} isLoading={isLoading} />
    </Container>
  );
};

export default SecondStep;
