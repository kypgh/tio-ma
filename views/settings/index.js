import React, { useState } from "react";
import { TitleH3 } from "../../components/Typography";
import { H1 } from "../../components/Typography/typography.styles";
import { Dflex, RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { theme } from "../../styles/theme";
import { ButtonCenter, SettingsRow } from "./settings.styles";
import AccountDetailsKypros from "./account-details-kypros";
import SelectAccount from "../../components/inputs/SelectAccount";
import { useMutation } from "react-query";
import agent from "../../utils/agent";
import ModalHook from "../../components/ModalHook";
import styled from "styled-components";
import { BiMailSend } from "react-icons/bi";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";
import Switch from "../../components/inputs/Switch";
import Dropdown from "../../components/inputs/Dropdown";
import { languagesList } from "../../config/languageConfig";
import { device } from "../../styles/device";
import Input from "../../components/inputs/Input";
import { useCurrentUser } from "../../utils/hooks/queryHooks";
import { useNotification } from "../../components/actionNotification/NotificationProvider";
import useWindowSize from "../../utils/hooks/useWindowSize";

const LeftSide = styled.div`
  /* max-width: 50%; */
  /* width: fit-content; */
  width: 100%;
  /* margin: auto; */
  max-width: 1050px;
  display: flex;
  /* background-color: red; */
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
  /* align-items: center; */
  justify-content: center;
`;

const FullWidth = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ErrorMsg = styled.p`
  color: red;
  max-width: 400px;
  width: 100%;
`;

const ReadOnlyContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f5f6;
  & h2 {
    width: 100%;
    text-align: start;
  }

  label {
    color: #8f9091;
  }
  & input {
    color: #8f9091;
  }
`;

const PersonaInfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f5f6;
  & h2 {
    width: 100%;
    text-align: start;
  }
`;

export default function SettingsView({
  pageTranslations,
  genericTranslations,
}) {
  const { save, settingsTitle } = pageTranslations;

  const {
    address,
    city,
    country,
    email,
    firstName,
    lastName,
    newPass,
    oldPass,
    phoneNum,
    postcode,
  } = genericTranslations;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { width } = useWindowSize();

  const { data: currentUser } = useCurrentUser();

  const actionNotification = useNotification();

  const changePassword = useMutation(
    ({ oldPassword, newPassword }) =>
      agent().changeUserPassword({ oldPassword, newPassword }),
    {
      onSuccess: () => {
        setErrors([]);
        actionNotification.SUCCESS("Password changed successfully");
      },
      onError: (err) => {
        console.log(err);
        setErrors(
          err.response.data.details
            ? err.response.data.details.map((e) =>
                e.message
                  ?.replace('"oldPassword"', "Old Password")
                  .replace('"newPassword"', "New Password")
              )
            : err.response.data.message
        );
      },
    }
  );

  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlide /> */}
        <Mcontainer
          bxshadow={theme.colors.primaryBoxShadow}
          pall={"30px 36px"}
          hideRefetch
        >
          <H1>{settingsTitle}</H1>

          <LeftSide>
            <ReadOnlyContainer>
              <Input
                readOnly
                label={firstName}
                value={currentUser.first_name || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />
              <Input
                readOnly
                label={lastName}
                value={currentUser.last_name || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />

              <Input
                readOnly
                label={email}
                value={currentUser.email || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />

              <Input
                readOnly
                label={phoneNum}
                value={currentUser.phone || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />

              <Input
                readOnly
                label={address}
                value={currentUser.address || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />

              <Input
                readOnly
                label={city}
                value={currentUser.city || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />

              <Input
                readOnly
                label={postcode}
                value={currentUser.postcode || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />

              <Input
                readOnly
                label={country}
                value={currentUser.country || ""}
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
              />
            </ReadOnlyContainer>
            <PersonaInfoContainer>
              <Input
                label={oldPass}
                type="password"
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Input
                label={newPass}
                type="password"
                width={width >= 650 ? "calc(100% / 2 - 20px / 2)" : "100%"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </PersonaInfoContainer>
            <FullWidth>
              <ButtonSecondary
                style={{ width: "100%", maxWidth: "350px" }}
                disabled={changePassword.isLoading}
                onClick={() => {
                  changePassword.mutate({ oldPassword, newPassword });
                }}
              >
                {save}
              </ButtonSecondary>
            </FullWidth>
            {errors.length > 0 && (
              <FullWidth>
                <ErrorMsg>{errors}</ErrorMsg>
              </FullWidth>
            )}
          </LeftSide>
        </Mcontainer>
      </RightContainer>
    </>
  );
}
