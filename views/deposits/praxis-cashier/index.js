import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

import { IoIosArrowBack } from "react-icons/io";

import agent from "../../../utils/agent";
import { BtnContainer, TabContent } from "./praxis.styles";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import PraxisCashierComp from "../../../components/Praxis/PraxisCashier";
import Loader from "../../../components/Loader";
import AccountSelect from "../../../components/AccountSelect";
import { useRouter } from "next/router";
import { CRYPTO_CURRENCIES } from "@/config/enums";

const PraxisContainer = styled.div`
  width: 100%;
`;

const ChangeAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  width: fit-content;
  padding: 3px 5px;
  cursor: pointer;
`;

const Praxis = ({ pageTranslations }) => {
  const { fldAccountId, btndepositslabel, changeAccount } = pageTranslations;

  const router = useRouter();

  const accountId = router.query.accountId || "";
  const setAccountId = (v) => {
    router.push(
      {
        query: { ...router.query, accountId: v },
      },
      null,
      { shallow: true }
    );
  };
  const [praxisAuthToken, setPraxisAuthToken] = useState("");

  const depositToAccount = useMutation(
    (accountId) => agent().depositToAccount({ accountId }),
    {
      mutationKey: "depositToAccount",
      onSuccess: async (data) => {
        setPraxisAuthToken(data.data.auth_token);
      },
    }
  );

  return (
    <TabContent>
      <Loader isLoading={depositToAccount.isLoading} />
      {!praxisAuthToken ? (
        <>
          <AccountSelect
            onChange={(val) => setAccountId(val._id)}
            enviroment="live"
            style={{ marginBottom: "20px" }}
            width={"300px"}
            value={accountId}
            filter={(account) => !CRYPTO_CURRENCIES.includes(account.currency)}
          />
          <BtnContainer>
            <ButtonPrimary
              onClick={() => depositToAccount.mutate(accountId)}
              disabled={depositToAccount.isLoading || !accountId}
            >
              {btndepositslabel}
            </ButtonPrimary>
          </BtnContainer>
        </>
      ) : (
        <PraxisContainer>
          <ChangeAccount onClick={() => setPraxisAuthToken("")}>
            <IoIosArrowBack />
            <span>{changeAccount}</span>
          </ChangeAccount>
          <PraxisCashierComp authToken={praxisAuthToken} />
        </PraxisContainer>
      )}
    </TabContent>
  );
};

export default Praxis;
