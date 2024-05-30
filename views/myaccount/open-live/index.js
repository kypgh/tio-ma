import Link from "next/link";
import styled from "styled-components";
import { useMutation } from "react-query";
import {
  AccountTypeSec,
  Form,
  LiveAccount,
  LiveAccountBtn,
  LiveAccountMain,
  OpenLiveAccountText,
  TabContent,
} from "./open-live.styles";

import { useEffect, useMemo, useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import agent from "../../../utils/agent";
import { useGetAllowedAccountTypes } from "../../../utils/hooks/queryHooks";
import { useRouter } from "next/router";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import SuccessScreen from "../../../components/SuccessScreen";
import aLinks from "../../../config/aLinks";
import { parseError } from "../../../utils/functions";

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

export default function OpenLiveAccount({
  pageTranslations,
  genericTranslations,
}) {
  const {
    openLivecheckedFirst,
    openLivecheckedLink,
    openLivecheckedSecond,
    openLiveAccounts,
    platformTitle,
    accountTypeTitle,
    currencyTitle,
    leverageTitle,
  } = pageTranslations;

  const { successMsgOpenAcc, success: successText } = genericTranslations;

  const [accountTypeArr, setAccountTypeArr] = useState([]);
  const [accountTypeValue, setAccountTypeValue] = useState("");
  const [platformArr, setPlatformArr] = useState([]);
  const [platformValue, setPlatformValue] = useState("");
  const [currencyArr, setCurrencyArr] = useState([]);
  const [currencyValue, setCurrencyValue] = useState("");
  const [leverageArr, setLeverageArr] = useState([]);
  const [leverageValue, setLeverageValue] = useState("");
  const [terms, setTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const createTradingAccount = useMutation(
    ({ account_type, platform, currency, leverage }) =>
      agent().createTradingAccount({
        account_type,
        platform,
        currency,
        leverage,
        environment_type: "live", // TODO: change to live
      }),
    {
      onSuccess: () => {
        setErrorMsg("");
        setSuccess(true);
      },
      mutationKey: "createTradingAccountLive",
      onError: (error) => {
        setSuccess(false);
        setErrorMsg(parseError(error));
      },
    }
  );

  const formatter = {
    standard: "Standard",
    vip: "VIP",
    vipblack: "VIP Black",
    mt4: "MT4",
    mt5: "MT5",
    ctrader: "cTrader",
  };

  const { data } = useGetAllowedAccountTypes("live", {
    onSuccess: (data) => {
      setPlatformArr(
        Object.keys(data).map((key) => ({
          name: key,
          value: key,
        }))
      );
    },
  });

  const isDisabled = useMemo(
    () =>
      !(
        accountTypeValue &&
        platformValue &&
        currencyValue &&
        leverageValue &&
        terms
      ),
    [accountTypeValue, platformValue, currencyValue, leverageValue, terms]
  );

  useEffect(() => {
    setCurrencyArr([]);
    setCurrencyValue("");
    setLeverageArr([]);
    setLeverageValue("");

    if (!data) return;
    if (data[platformValue]) {
      setAccountTypeArr(data[platformValue]);
    }
    setAccountTypeValue("");
  }, [platformValue]);

  useEffect(() => {
    if (!data) return;
    if (data[platformValue]?.find((el) => el.value === accountTypeValue)) {
      setCurrencyArr(
        data[platformValue]
          .find((el) => el.value === accountTypeValue)
          ?.currencies.map((el) => ({ name: el, value: el }))
      );
      setLeverageArr(
        data[platformValue]
          .find((el) => el.value === accountTypeValue)
          ?.leverages.map((el) => ({ name: `1:${el}`, value: el }))
      );
    }
    setCurrencyValue("");
    setLeverageValue("");
  }, [accountTypeValue]);

  return (
    <TabContent>
      {success ? (
        <SuccessScreen
          header={successText}
          msg={successMsgOpenAcc}
          onConfirm={() =>
            router.push({
              pathname: aLinks.myaccount,
            })
          }
        />
      ) : (
        <LiveAccountMain>
          <Form onSubmit={(e) => e.preventDefault()}>
            <LiveAccount>
              <AccountTypeSec>
                <Dropdown
                  id="platform"
                  label={platformTitle}
                  options={platformArr}
                  onChange={(e) => setPlatformValue(e.target.value)}
                  value={platformValue}
                  formatterObject={formatter}
                />
                <Dropdown
                  id="accountType"
                  label={accountTypeTitle}
                  options={accountTypeArr}
                  onChange={(e) => setAccountTypeValue(e.target.value)}
                  value={accountTypeValue}
                  formatterObject={formatter}
                  disabled={!accountTypeArr.length}
                />
              </AccountTypeSec>
              <AccountTypeSec>
                <Dropdown
                  id="currency"
                  label={currencyTitle}
                  options={currencyArr}
                  onChange={(e) => setCurrencyValue(e.target.value)}
                  value={currencyValue}
                  formatterObject={formatter}
                  disabled={!currencyArr.length}
                />
                <Dropdown
                  id="leverage"
                  label={leverageTitle}
                  options={leverageArr}
                  onChange={(e) => setLeverageValue(e.target.value)}
                  value={leverageValue}
                  formatterObject={formatter}
                  disabled={!leverageArr.length}
                />
              </AccountTypeSec>

              <OpenLiveAccountText>
                <label className="mylabel">
                  <input
                    className="mychk-open"
                    type="checkbox"
                    name="checkbox"
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <span className="mylabel">
                    {openLivecheckedFirst}{" "}
                    <Link
                      href="https://tiomarkets.com/legal-documents/ClientsAgreement.pdf"
                      target="_blank"
                    >
                      {openLivecheckedLink}
                    </Link>{" "}
                    {openLivecheckedSecond}
                  </span>
                </label>
              </OpenLiveAccountText>
              <LiveAccountBtn>
                <ButtonPrimary
                  disabled={isDisabled || createTradingAccount.isLoading}
                  onClick={() =>
                    createTradingAccount.mutate({
                      account_type: accountTypeValue,
                      platform: platformValue,
                      currency: currencyValue,
                      leverage: leverageValue,
                    })
                  }
                >
                  {openLiveAccounts}
                </ButtonPrimary>
              </LiveAccountBtn>
              {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            </LiveAccount>
          </Form>
        </LiveAccountMain>
      )}
    </TabContent>
  );
}
