import React, { useEffect, useState } from "react";
import TwoStepForm from "../../../components/TwoStepForm";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { useCurrentUser } from "../../../utils/hooks/queryHooks";
import Loader from "../../../components/Loader";
import { useMutation, useQueryClient } from "react-query";
import agent from "../../../utils/agent";
import { setCookies } from "cookies-next";
import { GoVerified } from "react-icons/go";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { useRouter } from "next/router";

const ErrorMsg = styled.div`
  color: ${theme.colors.errorMsg};
  width: 100%;
  text-align: center;
`;

const EmailVerification = ({ pageTranslations }) => {
  const {} = pageTranslations;
  const [activeStep, setActiveStep] = useState(1);
  const [hasError, setHasError] = useState(null);

  const { data: currentUser, isLoading } = useCurrentUser();

  const router = useRouter();

  const queryClient = useQueryClient();

  const sendVerificationEmail = useMutation(
    () => agent().sendVerificationEmail(),
    {
      onSuccess: () => {
        setActiveStep(2);
      },
      onError: (err) => {
        if (err.response.data.code === 47) {
          setActiveStep(2);
        }
      },
      mutationKey: "sendVerificationEmail",
    }
  );

  const verifyEmail = useMutation((token) => agent().verifyEmail(token), {
    onSuccess: () => {
      setHasError(false);
      setCookies("token", "", { path: "/" });
      queryClient.invalidateQueries(["currentUser"]);
    },
    onError: (err) => {
      setHasError(true);
      setActiveStep(1);
      console.error(err);
      setCookies("token", "", { path: "/" });
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  useEffect(() => {
    const { emailVerificationToken, ...rest } = router.query;
    if (emailVerificationToken) {
      verifyEmail.mutate(emailVerificationToken);
      router.replace({
        pathname: router.pathname,
        query: rest,
      });
    }
  }, [router.query]);

  if (isLoading) return <Loader isLoading={isLoading} />;

  return currentUser.flags?.emailVerified ? (
    <AlreadyVerified pageTranslations={pageTranslations} />
  ) : (
    <>
      <TwoStepForm
        isLoading={verifyEmail.isLoading || sendVerificationEmail.isLoading}
        firstStep={
          <FirstStep
            onNext={() => {
              sendVerificationEmail.mutate();
            }}
            isBtnDisabled={sendVerificationEmail.isLoading}
            pageTranslations={pageTranslations}
          />
        }
        secondStep={
          <SecondStep
            onBack={() => setActiveStep(1)}
            onSubmit={(otp) => {
              verifyEmail.mutate(otp);
            }}
            isLoading={verifyEmail.isLoading}
            errorMessage={sendVerificationEmail.error?.response?.data?.message}
            pageTranslations={pageTranslations}
          />
        }
        activeStep={activeStep}
      />

      {hasError && (
        <ErrorMsg>
          Invalid verification code, please resend the verification email
        </ErrorMsg>
      )}
    </>
  );
};

export default EmailVerification;

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
  const { emailIsVerified } = pageTranslations;
  return (
    <Container>
      <Title>{emailIsVerified}</Title>
      <GoVerified size={100} />
    </Container>
  );
};
