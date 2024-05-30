import React, { useState } from "react";
import styled from "styled-components";
import { TitleH3 } from "../../../components/Typography";
import { theme } from "../../../styles/theme";
import agent from "../../../utils/agent";
import TwoStepForm from "../../../components/TwoStepForm";
import OtpInput from "../../../components/OtpInput";
import ButtonSecondary from "../../../components/Buttons/ButtonSecondary";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  width: 100%;
  gap: 15px;
  padding: 20px;
  border-radius: 7px;
  background-color: ${theme.colors.mainWhite};
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25));
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
`;

const PhoneDisplay = styled.div`
  color: ${theme.colors.mainBlack};
  font-weight: 500;
  font-size: 20px;
  margin-top: 45px;
  margin-bottom: 75px;
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
`;

const PhoneVerification = ({ phone, closeModal }) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Outer>
      <TwoStepForm
        firstStep={
          <FirstStep
            phone={phone}
            closeModal={closeModal}
            setActiveStep={setActiveStep}
          />
        }
        secondStep={
          <SecondStep
            phone={phone}
            closeModal={closeModal}
            setActiveStep={setActiveStep}
          />
        }
        activeStep={activeStep}
      />
    </Outer>
  );
};

const FirstStep = ({ phone, closeModal, setActiveStep }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <TitleH3
        mt="10px"
        mb="40px"
        size={"20px"}
        lheight={"24px"}
        fweight={"500"}
        fsize={"20px"}
        style={{ textAlign: "center" }}
        txtcolor={theme.colors.secondaryDarkGray}
      >
        You are about to change your phone number,
        <br />a verification code will be send to
        <br></br>
      </TitleH3>
      <PhoneDisplay
        mt={"45px"}
        mb={"75px"}
        fweight={"500"}
        fsize={"20px"}
        txtcolor={theme.colors.secondaryBlack}
      >
        {phone}
      </PhoneDisplay>
      <BtnContainer>
        <ButtonSecondary
          light
          width={"140px"}
          style={{
            fontSize: "12px",
            fontWeight: "700",
          }}
          onClick={() => {
            closeModal();
          }}
        >
          CANCEL
        </ButtonSecondary>
        <ButtonSecondary
          width={"140px"}
          style={{
            fontSize: "12px",
            fontWeight: "700",
          }}
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            agent()
              .changePhoneSendOTP(phone)
              .then((res) => {
                setActiveStep(2);
              })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          SEND CODE
        </ButtonSecondary>
      </BtnContainer>
    </>
  );
};

const SecondStep = ({ phone, setActiveStep, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <TitleH3
        mt="10px"
        mb="40px"
        size={"20px"}
        lheight={"24px"}
        fweight={"500"}
        fsize={"20px"}
        style={{ textAlign: "center" }}
        txtcolor={theme.colors.secondaryDarkGray}
      >
        Enter OTP
      </TitleH3>
      <OtpInput
        isLoading={isLoading}
        onBack={() => setActiveStep(1)}
        onSubmit={(otp) => {
          setIsLoading(true);
          agent()
            .changePhoneVerifyOTP({ phone, otp })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      />
    </>
  );
};

export default PhoneVerification;
