import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";

import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import Input from "../../components/inputs/Input";
import { TitleH1 } from "../../components/Typography";
import aLinks from "../../config/aLinks";
import {
  ButtonContainer,
  InputContainer,
  LoginMainContainer,
  MainContainer,
} from "../../styles/sharedstyles";
import { theme } from "../../styles/theme";
import entity from "../../constants/entity";
import agent from "../../utils/agent";
import SuccessScreen from "../../components/SuccessScreen";
import { useRouter } from "next/router";

export default function ForgetPassword({ pageTranslations }) {
  const { forgotPassword, btnSubmit, plcEmailAddress, back } = pageTranslations;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const forgotPasswordMutation = useMutation(
    ({ email, entity }) => agent().forgotPassword({ email, entity }),
    {
      mutationKey: "forgotPassword",
      onSuccess: () => setSubmitted(true),
      onError: (err) => setError(err?.response?.data?.message),
    }
  );

  return (
    <MainContainer>
      {submitted ? (
        <SuccessScreen
          header="Success"
          msg="An email has been sent to you."
          btnMsg="Back to Login"
          onConfirm={() => router.push(aLinks.index)}
        />
      ) : (
        <>
          <TitleH1
            fweight={"700"}
            fsize={"22px"}
            lheight={"27px"}
            mb={"26px"}
            txtcolor={theme.colors.secondaryBlack}
          >
            {forgotPassword}
          </TitleH1>
          <LoginMainContainer>
            <InputContainer>
              <Input
                type="text"
                placeholder={plcEmailAddress}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <ButtonContainer>
              <ButtonPrimary
                width={"395px"}
                // TODO: fix entity
                onClick={() =>
                  forgotPasswordMutation.mutate({ email, entity: entity })
                }
              >
                {btnSubmit}
              </ButtonPrimary>
            </ButtonContainer>
            <p
              style={{
                color: "red",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
            <Link
              href={aLinks.index}
              style={{ color: theme.colors.secondaryColor }}
            >
              {back}
            </Link>
          </LoginMainContainer>
        </>
      )}
    </MainContainer>
  );
}
