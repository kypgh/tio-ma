import Link from "next/link";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import { TitleH1 } from "../../components/Typography";
import {
  ButtonContainer,
  Dflex,
  InputContainer,
  LoginMainContainer,
  MainContainer,
} from "../../styles/sharedstyles";
import { theme } from "../../styles/theme";
import {
  CreateAccount,
  ForgotPassword,
  IconImgPass,
  TioImgIcons,
  RememberContainer,
} from "./login.styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import agent from "../../utils/agent";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import FormInput from "../../components/inputs/FormInput";
import aLinks from "../../config/aLinks";
import entity from "../../constants/entity";
import useIsCookiesEnabled from "../../utils/hooks/useIsCookiesEnabled";
import useWindowSize from "../../utils/hooks/useWindowSize";
import { parseError } from "../../utils/functions";

const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 5px;
`;

export default function LoginView({ pageTranslations }) {
  const {
    lblPassword,
    errInvalidemail,
    errEmailRequired,
    errPasswordUpr,
    errPasswordLor,
    errPasswordOneNumber,
    errPasswordOneSpecial,
    errPasswordAtLeast,
    signin,
    someThingWrong,
    linkCreateAccount,
    newTioMakets,
    rememberMe,
    plcEmailOrId,
    forgotPassword,
    invlaidCred,
  } = pageTranslations;

  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [error, setError] = useState();
  const [isRememberMe, setIsRememberMe] = useState(false);

  const { width } = useWindowSize();

  const isCookiesEnabled = useIsCookiesEnabled();

  useEffect(() => {
    if (isCookiesEnabled) {
      setIsRememberMe(localStorage.getItem("rememberMe") === "true");
    }
  }, [isCookiesEnabled]);

  const loginSchema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
  });
  const formRef = useRef();
  const router = useRouter();

  const { email } = router.query;

  return (
    <>
      <MainContainer>
        <TitleH1
          fweight={"700"}
          fsize={"22px"}
          lheight={"27px"}
          mb={"26px"}
          txtcolor={theme.colors.secondaryBlack}
          style={{
            textAlign: width < 768 ? "center" : "left",
            width: "100%",
          }}
        >
          {signin}
        </TitleH1>

        <Formik
          validationSchema={loginSchema}
          initialValues={{
            email: decodeURIComponent(email || ""),
            password: "",
          }}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            setError();
            //TODO: fix entity
            agent()
              .loginUser({
                email: values.email,
                password: values.password,
                entity: entity,
              })
              .then(async (res) => {
                try {
                  if (window.PasswordCredential) {
                    var c = new PasswordCredential(formRef.current);
                    await navigator.credentials.store(c);
                  }
                } catch (err) {
                  console.error("failed to promt");
                  console.error(err);
                }
                return res;
              })
              .then((res) => {
                const { from } = router.query;

                if (from) {
                  return router.push(from);
                }
                return router.push(aLinks.dashboard);
              })
              .catch((err) => {
                console.error(err);
                setError(parseError(err));
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ handleSubmit, errors, setFieldValue, isSubmitting, values }) => (
            <>
              <LoginMainContainer ref={formRef} className="position-relative">
                <Loader isLoading={isSubmitting} />
                <InputContainer>
                  <Dflex column style={{ gap: "20px" }}>
                    <FormInput
                      type="text"
                      label={plcEmailOrId}
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      data-valid={true}
                      error={errors.email}
                      name="email"
                      autoComplete="username"
                    />
                    <IconImgPass>
                      <FormInput
                        label={lblPassword}
                        type={isRevealPwd ? "text" : "password"}
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                        data-valid={true}
                        value={values.password}
                        error={errors.password}
                        name="password"
                        autoComplete="current-password"
                      />
                      <TioImgIcons
                        title={isRevealPwd ? "Hide password" : "Show password"}
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                        alt="icon"
                        width={15}
                        height={15}
                      >
                        {isRevealPwd ? <RxEyeOpen /> : <RxEyeClosed />}
                      </TioImgIcons>
                    </IconImgPass>
                  </Dflex>
                </InputContainer>
                <RememberContainer>
                  <label>
                    <input
                      className="mychk-remember"
                      type="checkbox"
                      name="RememberMe"
                      checked={isRememberMe}
                      onChange={(e) => {
                        if (isCookiesEnabled) {
                          localStorage.setItem(
                            "rememberMe",
                            e.target.checked.toString()
                          );
                          setIsRememberMe(e.target.checked);
                        }
                      }}
                    />
                    <span>{rememberMe}</span>
                  </label>
                </RememberContainer>
                <ButtonContainer>
                  <ButtonPrimary width={"395px"} onClick={handleSubmit}>
                    {signin}
                  </ButtonPrimary>
                </ButtonContainer>
                {error && <ErrorMsg>{error}</ErrorMsg>}

                <ForgotPassword>
                  <Link href={aLinks.forgotPassword}>{forgotPassword}</Link>
                </ForgotPassword>
              </LoginMainContainer>
              <CreateAccount>
                {newTioMakets}
                <Link href={aLinks.register} className="text-blue">
                  {linkCreateAccount}
                </Link>
              </CreateAccount>
            </>
          )}
        </Formik>
      </MainContainer>
    </>
  );
}
