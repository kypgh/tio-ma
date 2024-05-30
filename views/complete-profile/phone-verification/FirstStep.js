import React from "react";
import styled from "styled-components";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
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

const Message = styled.p`
  color: ${theme.colors.mainBlack};
  font-size: 14px;
`;

const FirstStep = ({ onNext, isBtnDisabled, pageTranslations }) => {
  const { verifyPhoneNumberTitle, verifyPhoneNumberMessage, nextBtnTxt } =
    pageTranslations;
  return (
    <Container>
      <Title>{verifyPhoneNumberTitle}</Title>
      <Message>{verifyPhoneNumberMessage}</Message>
      <ButtonPrimary onClick={onNext} disabled={isBtnDisabled}>
        {nextBtnTxt}
      </ButtonPrimary>
    </Container>
  );
};

export default FirstStep;
