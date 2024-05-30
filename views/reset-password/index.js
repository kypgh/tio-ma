import { useRouter } from "next/router";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import FormInput from "../../components/inputs/FormInput";
import { TitleH1 } from "../../components/Typography";
import {
  ButtonContainer,
  InputContainer,
  LoginMainContainer,
  MainContainer,
} from "../../styles/sharedstyles";
import { theme } from "../../styles/theme";
import { useState } from "react";
import SuccessScreen from "../../components/SuccessScreen";
import aLinks from "../../config/aLinks";
import Loader from "../../components/Loader";
import { IconImgPass } from "../register/register.styles";
import { TioImgIcons } from "../login/login.styles";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useMutation } from "react-query";
import agent from "../../utils/agent";
import { parseError } from "../../utils/functions";

export default function ResetPassword({ pageTranslations }) {
  const { resetPassword, plcNewPassword, plcConfirmPassword, btnSubmit, back } =
    pageTranslations;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealConfirmPwd, setIsRevealConfirmPwd] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  const resetPass = useMutation(
    () =>
      agent()
        .resetUserPassword({ token, newPassword: confirmPassword })
        .then((res) => res.data),
    {
      onSuccess: () => setSuccess(true),
      onError: (err) => setError(parseError(err, "password")),
    }
  );

  return (
    <MainContainer>
      {success ? (
        <SuccessScreen
          header={"Success"}
          onConfirm={() => router.push({ pathname: aLinks.index })}
          msg="Password Updated!"
          btnMsg="Back to Login"
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
            {resetPassword}
          </TitleH1>
          <LoginMainContainer style={{ gap: "15px", position: "relative" }}>
            <Loader isLoading={resetPass.isLoading} />

            <InputContainer>
              <IconImgPass
                style={{
                  position: "relative",
                }}
              >
                <FormInput
                  type={isRevealPwd ? "text" : "password"}
                  placeholder={plcNewPassword}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TioImgIcons
                  title={isRevealPwd ? "Hide password" : "Show password"}
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  alt="icon"
                  width={15}
                  height={15}
                >
                  {isRevealPwd ? <RxEyeOpen /> : <RxEyeClosed />}
                </TioImgIcons>
              </IconImgPass>
            </InputContainer>
            <InputContainer>
              <IconImgPass
                style={{
                  position: "relative",
                }}
              >
                <FormInput
                  type={isRevealConfirmPwd ? "text" : "password"}
                  placeholder={plcConfirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <TioImgIcons
                  title={isRevealConfirmPwd ? "Hide password" : "Show password"}
                  onClick={() =>
                    setIsRevealConfirmPwd((prevState) => !prevState)
                  }
                  alt="icon"
                  width={15}
                  height={15}
                >
                  {isRevealConfirmPwd ? <RxEyeOpen /> : <RxEyeClosed />}
                </TioImgIcons>
              </IconImgPass>
            </InputContainer>
            <p style={{ color: "red" }}>{error}</p>
            <p style={{ fontSize: "14px" }}>
              {`*Minimum 8 characters in length, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Optional special characters accepted: @!#$%^&*()-_.\/<>*:;|+=[]{}~`}
            </p>
            <ButtonContainer>
              <ButtonPrimary
                width={"395px"}
                disabled={
                  newPassword !== confirmPassword ||
                  resetPass.isLoading ||
                  !newPassword ||
                  !confirmPassword
                }
                onClick={() => {
                  resetPass.mutate();
                }}
              >
                {btnSubmit}
              </ButtonPrimary>
            </ButtonContainer>
          </LoginMainContainer>
        </>
      )}
    </MainContainer>
  );
}
