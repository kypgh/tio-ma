import React, { useState } from "react";
import { TitleH3 } from "../../../components/Typography";
import { theme } from "../../../styles/theme";
import styled from "styled-components";
import ModalHook from "../../../components/ModalHook";
import PhoneVerification from "./PhoneVerification";
import { useCurrentUser } from "../../../utils/hooks/queryHooks";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "../../../components/inputs/PhoneInput";
import ButtonSecondary from "../../../components/Buttons/ButtonSecondary";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  width: fit-content;
  gap: 15px;
`;

const AccountDetails = ({ pageTranslations }) => {
  const [phone, setPhone] = useState("");
  const { data: currentUser } = useCurrentUser();
  const isPhoneVerified = currentUser?.flags?.phoneVerified;

  const { accDetails, phoneNum, changeNum } = pageTranslations;

  return (
    <>
      <TitleH3
        mt="0px"
        mb="35px"
        size={"20px"}
        lheight={"24px"}
        fweight={"500"}
        txtcolor={theme.colors.secondaryDarkGray}
        txtalign={"left"}
      >
        {accDetails}
      </TitleH3>
      <Container>
        <PhoneInput
          label={phoneNum}
          id="changePhoneNumber"
          verifiedLabel={isPhoneVerified && "Verified"}
          onChange={(value) => {
            setPhone(value);
          }}
        />
        <ModalHook componentToShow={<PhoneVerification phone={phone} />}>
          {({ openModal }) => (
            <ButtonSecondary
              onClick={openModal}
              width={"140px"}
              style={{
                fontSize: "10px",
                fontWeight: "700",
              }}
              disabled={!isValidPhoneNumber(phone)}
            >
              {changeNum}
            </ButtonSecondary>
          )}
        </ModalHook>
      </Container>
    </>
  );
};

export default AccountDetails;
