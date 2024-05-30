import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Loader from "../Loader";
import { useMutation } from "react-query";
import agent from "../../utils/agent";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import { TIO_CTRADER_LIVE_ACCOUNT_TYPES } from "../../config/enums";

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

  h3 {
    font-size: 18px;
    color: ${theme.colors.mainBlack};
    font-weight: 500;
    margin: 0;
    max-width: 400px;
    text-align: center;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  p {
    font-size: 16px;
    color: ${theme.colors.mainBlack};
    font-weight: 500;
    margin: 0;
  }

  span {
    font-size: 18px;
    color: ${theme.colors.primaryColor};
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
`;

const mappedAccountTypes = TIO_CTRADER_LIVE_ACCOUNT_TYPES.reduce(
  (acc, curr) => {
    acc[curr.name] = curr.label;
    return acc;
  },
  {}
);
const ForgotPass = ({ account, pageTranslations }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const resetPass = useMutation((id) => agent().resetAccountPassword(id), {
    mutationKey: ["resetAccountPassword", account._id],
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  return (
    <Outer>
      <Loader isLoading={resetPass.isLoading} />
      {isSuccess ? (
        <h3>
          A new password has been sent to your email address. Please check your
          email.
        </h3>
      ) : (
        <>
          <h3>
            Are you sure you want to reset the password for the following
            account
          </h3>
          <Flex>
            <Details>
              <p>Account ID -</p>
              <span>{account.login_id}</span>
            </Details>
            <Details>
              <p>Platform -</p>
              <span>{account.platform}</span>
            </Details>
            <Details>
              <p>Type -</p>
              <span>{mappedAccountTypes[account.account_type]}</span>
            </Details>
            <Details>
              <p>Balance -</p>
              <span>{account.balance}</span>
            </Details>
            <Details>
              <p>Currency -</p>
              <span>{account.currency}</span>
            </Details>
            <Details>
              <p>Leverage -</p>
              <span>{account.leverage}</span>
            </Details>
          </Flex>
          <ButtonPrimary
            onClick={() => {
              resetPass.mutate(account._id);
            }}
          >
            Reset Password
          </ButtonPrimary>
        </>
      )}
    </Outer>
  );
};

export default ForgotPass;
