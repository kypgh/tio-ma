import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { TitleH2 } from "../Typography";
import FormInput from "../inputs/FormInput";
import ButtonSecondary from "../Buttons/ButtonSecondary";
import { Dflex } from "../../styles/sharedstyles";
import { useMutation } from "react-query";
import agent from "../../utils/agent";
import Loader from "../Loader";

const Outer = styled.div`
  padding: 40px 20px;
  max-width: 700px;
  width: 100%;
  background-color: ${theme.colors.mainWhite};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: relative;
`;

const CloseAccount = ({ closeModal, account, pageTranslations }) => {
  const {
    closeAccountRequest,
    reason: reasonTranslation,
    closeAcc,
    cancel,
  } = pageTranslations;

  const [reason, setReason] = useState("");
  const deleteAccountRequest = useMutation(
    ({ account, reason }) => agent().deleteAccountRequest({ account, reason }),
    {
      mutationKey: ["deleteAccountRequest", account._id],
      onSuccess: () => {},
    }
  );
  return (
    <Outer>
      <Loader isLoading={deleteAccountRequest.isLoading} />
      {deleteAccountRequest.isSuccess ? (
        <RequestSubmitted
          closeModal={closeModal}
          pageTranslations={pageTranslations}
        />
      ) : (
        <>
          <TitleH2>{closeAccountRequest}</TitleH2>
          <FormInput
            label={reasonTranslation}
            width="500"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Dflex style={{ gap: "15px" }}>
            <ButtonSecondary
              width={150}
              onClick={() => {
                deleteAccountRequest.mutate({
                  account: account._id,
                  reason,
                });
              }}
              disabled={deleteAccountRequest.isLoading}
            >
              {closeAcc}
            </ButtonSecondary>
            <ButtonSecondary light width={100} onClick={closeModal}>
              {cancel}
            </ButtonSecondary>
          </Dflex>
        </>
      )}
    </Outer>
  );
};

export default CloseAccount;

const RequestSubmitted = ({ closeModal, pageTranslations }) => {
  const { reqSubmitted, success, close } = pageTranslations;
  return (
    <Outer>
      <TitleH2>{success}</TitleH2>
      <p>{reqSubmitted}</p>
      <ButtonSecondary light width={100} onClick={closeModal}>
        {close}
      </ButtonSecondary>
    </Outer>
  );
};
