import { useMemo, useState } from "react";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { Formik } from "formik";
import * as Yup from "yup";
import { TitleH1, ParaText } from "../../../components/Typography";
import { CRYPTO_CURRENCIES, CURRENCIES } from "../../../config/enums";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import { useGetUserAccountById } from "../../../utils/hooks/queryHooks";
import { WithdrawalContainer } from "./withdrawal-crypto.styles";
import FormInput from "../../../components/inputs/FormInput";
import { useMutation } from "react-query";
import agent from "../../../utils/agent";
import SuccessScreen from "../../../components/SuccessScreen";
import AccountSelect from "../../../components/AccountSelect";
import { useRouter } from "next/router";
import { parseError } from "@/utils/functions";

const fees = {
  BTC: 0.0006,
  ETH: 0.003,
  USDT: 10,
};

export default function WithdrawalCrypto({
  pageTranslations,
  genericTranslations,
}) {
  const {
    withdrawalCryptoTitle,
    availableMT5AccountsOnlyTxt,
    cryptoWithdrawalFeesLabel,
    cryptoWithdrawalFeesValue,
    cryptoAccountLabel,
    cryptoReceiverAddressLabel,
    cryptoAmountLabel,
    withdrawFundsBtnTxt,
    backBtnTxt,
  } = pageTranslations;

  const { accId, plsSelect } = genericTranslations;

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [axiosError, setAxiosError] = useState(null);

  const router = useRouter();
  const { accountId } = router.query;

  const { data } = useGetUserAccountById(accountId, {
    enabled: !!accountId,
    initialData: {},
  });

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        accountId: Yup.string().required().label("Account"),
        amount: Yup.number()
          .required()
          .max(data?.account?.balance)
          .min(fees[data?.account?.currency])
          .label("Amount"),
        crypto_details: Yup.object()
          .shape({
            address: Yup.string().required().label("Address"),
          })
          .label("Crypto Details"),
        password: Yup.string().required().label("Password"),
      }),
    [data]
  );

  const withdrawFromAccount = useMutation(
    ({ accountId, body }) => agent().withdrawFromAccount({ accountId, body }),
    {
      onSuccess: () => {
        setHasSubmitted(true);
      },
      onError: (error) => {
        setAxiosError(parseError(error));
        console.log("asd");
      },
    }
  );

  return hasSubmitted ? (
    <SuccessScreen
      header="Success"
      msg="Withdrawal request has been submitted!"
      btnMsg={backBtnTxt}
      onConfirm={() => setHasSubmitted(false)}
    />
  ) : (
    <WithdrawalContainer>
      <TitleH1
        fweight={"700"}
        fsize={"14px"}
        lheight={"17px"}
        mb={"10px"}
        txtcolor={theme.colors.secondaryBlack}
      >
        {withdrawalCryptoTitle}
      </TitleH1>
      <ParaText pmt={"0px"} pmb={"10px"}>
        {availableMT5AccountsOnlyTxt}
      </ParaText>
      <ParaText pmt={"0px"} pmb={"20px"}>
        <strong>{cryptoWithdrawalFeesLabel}</strong> {cryptoWithdrawalFeesValue}
      </ParaText>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{
          accountId: accountId || "",
          amount: "",
          crypto_details: { address: "" },
          password: "",
        }}
        onSubmit={(values) => {
          withdrawFromAccount.mutate({
            accountId: values.accountId,
            body: {
              amount: values.amount,
              crypto_details: { address: values.crypto_details.address },
              password: values.password,
              currency: data.account.currency,
            },
          });
        }}
      >
        {({ setFieldValue, values, handleChange, errors, handleSubmit }) => (
          <Dflex column style={{ gap: "25px" }}>
            <AccountSelect
              name="accountId"
              width="345"
              disableZeroBalance
              enviroment="live"
              filter={(acc) => CRYPTO_CURRENCIES.includes(acc.currency)}
              onChange={(val) => {
                const tab = router.query.tab;
                const subTab = router.query.subTab;
                router.push(
                  {
                    query: {
                      tab,
                      subTab,
                      accountId: val._id,
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              value={values.accountId}
              label={accId}
              optionsLabel={plsSelect}
            />
            {data.account && (
              <>
                <FormInput
                  width={"345px"}
                  label={cryptoReceiverAddressLabel}
                  color={theme.colors.mainWhite}
                  name="crypto_details.address"
                  value={values.crypto_details.address}
                  onChange={handleChange}
                  error={errors.crypto_details?.address}
                />
                <FormInput
                  width={"345px"}
                  label={cryptoAmountLabel}
                  color={theme.colors.mainWhite}
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  error={errors.amount}
                  type="number"
                  min="0"
                />
                <FormInput
                  width={"345px"}
                  label={"Password"}
                  color={theme.colors.mainWhite}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  type="password"
                />
              </>
            )}
            {axiosError && (
              <ParaText
                pmt={"0px"}
                pmb={"20px"}
                style={{ color: theme.colors.primaryRed }}
              >
                {axiosError}
              </ParaText>
            )}
            <ButtonPrimary
              width={345}
              disabled={!accountId || !data.account}
              type="submit"
              onClick={handleSubmit}
            >
              {withdrawFundsBtnTxt}
            </ButtonPrimary>
          </Dflex>
        )}
      </Formik>
    </WithdrawalContainer>
  );
}
