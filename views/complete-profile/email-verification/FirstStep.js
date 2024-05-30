import React from "react";
import styled from "styled-components";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { theme } from "../../../styles/theme";
import { device } from "../../../styles/device";
import { useCurrentUser } from "@/utils/hooks/queryHooks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media ${device.mobile} {
    gap: 15px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${theme.colors.mainBlack};
`;

const Message = styled.p`
  color: ${theme.colors.mainBlack};
  font-size: 14px;

  @media ${device.mobile} {
    max-width: 200px;
    text-align: center;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

const FirstStep = ({ onNext, isBtnDisabled, pageTranslations }) => {
  const { verifyEmailTitle, verifyEmailMessage, sendEmail } = pageTranslations;
  const { data: user } = useCurrentUser();

  return (
    <Container>
      <Title>{verifyEmailTitle}</Title>
      <Message>{verifyEmailMessage}</Message>
      <Bold>{user?.email}</Bold>
      <ButtonPrimary onClick={onNext} disabled={isBtnDisabled}>
        {sendEmail}
      </ButtonPrimary>
    </Container>
  );
};

export default FirstStep;
