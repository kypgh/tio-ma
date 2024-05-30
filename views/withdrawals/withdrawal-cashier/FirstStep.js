import { WithdrawalCashierMain } from "./withdrawal-cashier.styles";
import { Formik } from "formik";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { useState } from "react";
import {
  useGetUserAccountById,
  useGetUserLiveAccounts,
} from "../../../utils/hooks/queryHooks";
import { CRYPTO_CURRENCIES } from "../../../config/enums";
import styled from "styled-components";
import AccountSelect from "../../../components/AccountSelect";
import { useRouter } from "next/router";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & > h4 {
    text-align: center;
    max-width: 600px;
  }
`;

const FirstStep = ({
  initialValues,
  pageTranslations,
  genericTranslations,
  nextPage = () => {},
}) => {
  const { chooseAccountLabel, nextBtnTxt, limit } = pageTranslations;
  const { accId, plsSelect } = genericTranslations;

  const router = useRouter();

  return (
    <WithdrawalCashierMain>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          nextPage(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Flex>
            <AccountSelect
              label={chooseAccountLabel}
              optionsLabel={plsSelect}
              width={"300px"}
              enviroment="live"
              disableZeroBalance
              onChange={(val) => {
                if (!val._id) return;
                setFieldValue("accountId", val._id);
                setFieldValue("currency", val.currency);
                router.push(
                  {
                    query: {
                      ...router.query,
                      accountId: val._id,
                      tab: "withdrawal",
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              value={values.accountId}
              filter={(account) =>
                !CRYPTO_CURRENCIES.includes(account.currency)
              }
            />
            <ButtonPrimary disabled={!values.accountId} onClick={handleSubmit}>
              {nextBtnTxt}
            </ButtonPrimary>
            <h4>{limit}</h4>
          </Flex>
        )}
      </Formik>
    </WithdrawalCashierMain>
  );
};

export default FirstStep;
