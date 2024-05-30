import Link from "next/link";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import Dropdown from "../../../components/inputs/Dropdown";
import agent from "../../../utils/agent";
import {
  AccountTypeSec,
  Form,
  LiveAccount,
  LiveAccountBtn,
  LiveAccountMain,
  OpenLiveAccountText,
  TabContent,
} from "../open-live/open-live.styles";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { useGetAllowedAccountTypes } from "../../../utils/hooks/queryHooks";
import { useRouter } from "next/router";
import { set } from "nprogress";
import aLinks from "../../../config/aLinks";
import SuccessScreen from "../../../components/SuccessScreen";
import { parseError } from "../../../utils/functions";

const ErrorMsg = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const formatter = {
  standard: "Standard",
  mt4: "MT4",
  mt5: "MT5",
  ctrader: "cTrader",
};

export default function OpenDemoAccount({ pageTranslations }) {
  const {
    openDemocheckedFirst,
    openLivecheckedLink,
    openLivecheckedSecond,
    openLiveAccount,
    platformTitle,
    accountTypeTitle,
    currencyTitle,
    leverageTitle,
    openDemoAccounts,
  } = pageTranslations;

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
        environment_type: "demo",
      }),
    {
      onSuccess: () => {
        setErrorMsg("");
        setSuccess(true);
      },
      mutationKey: "createTradingAccountDemo",
      onError: (error) => {
        setErrorMsg(parseError(error));
        setSuccess(false);
      },
    }
  );

  const { data } = useGetAllowedAccountTypes("demo", {
    onSuccess: (data) => {
      setPlatformArr(
        Object.keys(data).map((key) => ({
          label: key,
          value: key,
        }))
      );
    },
  });

  const isDisabled = useMemo(
    () =>
      !(
        !!accountTypeValue &&
        !!platformValue &&
        !!currencyValue &&
        !!leverageValue &&
        terms
      ),
    [accountTypeValue, platformValue, currencyValue, leverageValue, terms]
  );

  useEffect(() => {
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
          ?.currencies.map((el) => ({ label: el, value: el }))
      );
      setLeverageArr(
        data[platformValue]
          .find((el) => el.value === accountTypeValue)
          ?.leverages.map((el) => ({ label: `1:${el}`, value: el }))
      );
    }
    setCurrencyValue("");
    setLeverageValue("");
  }, [accountTypeValue]);

  return (
    <TabContent>
      {success ? (
        <SuccessScreen
          header="Success"
          msg="Your account has been created!"
          onConfirm={() =>
            router.push({
              pathname: aLinks.myaccount,
              query: {
                tab: "demo",
              },
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
                />
              </AccountTypeSec>
              <AccountTypeSec>
                <Dropdown
                  id="currency"
                  label={currencyTitle}
                  options={currencyArr}
                  onChange={(e) => setCurrencyValue(e.target.value)}
                  value={currencyValue}
                />
                <Dropdown
                  id="leverage"
                  label={leverageTitle}
                  options={leverageArr}
                  onChange={(e) => setLeverageValue(e.target.value)}
                  value={leverageValue}
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
                    {openDemocheckedFirst}{" "}
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
                  variant="alink"
                  className="btn btn-ornge"
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
                  {openDemoAccounts}
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
