import React, { useState } from "react";
import TwoStepForm from "../../../components/TwoStepForm";
import { useCurrentUser } from "../../../utils/hooks/queryHooks";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { useMutation, useQueryClient } from "react-query";
import agent from "../../../utils/agent";
import Loader from "../../../components/Loader";
import { setCookies } from "cookies-next";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { GoVerified } from "react-icons/go";

const PhoneVerification = ({ pageTranslations }) => {
  const {} = pageTranslations;
  const [activeStep, setActiveStep] = useState(1);
  const { data: currentUser, isLoading } = useCurrentUser();

  const queryClient = useQueryClient();

  const sendVerificationCode = useMutation(
    () => agent().sendVerificationSMS(),
    {
      onSuccess: () => {
        setActiveStep(2);
      },
      mutationKey: "sendVerificationCode",
    }
  );

  const verifyPhone = useMutation((token) => agent().verifySMS(token), {
    onSuccess: () => {
      setCookies("token", "", { path: "/" });
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (err) => {
      console.error(err);
      setCookies("token", "", { path: "/" });
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  if (isLoading) return <Loader isLoading={isLoading} />;

  return currentUser.flags?.phoneVerified ? (
    <AlreadyVerified pageTranslations={pageTranslations} />
  ) : (
    <TwoStepForm
      activeStep={activeStep}
      firstStep={
        <FirstStep
          onNext={() => {
            sendVerificationCode.mutate();
          }}
          isBtnDisabled={sendVerificationCode.isLoading}
          pageTranslations={pageTranslations}
        />
      }
      secondStep={
        <SecondStep
          onSubmit={(otp) => {
            verifyPhone.mutate(otp);
          }}
          isLoading={verifyPhone.isLoading}
          onBack={() => setActiveStep(1)}
          pageTranslations={pageTranslations}
        />
      }
    />
  );
};

export default PhoneVerification;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: ${theme.colors.mainBlack};
  font-weight: 700;
`;

const AlreadyVerified = ({ pageTranslations }) => {
  const { phoneIsVerified } = pageTranslations;
  return (
    <Container>
      <Title>{phoneIsVerified}</Title>
      <GoVerified size={100} />
    </Container>
  );
};
