import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { TitleH1 } from "../../../components/Typography";
import { theme } from "../../../styles/theme";
import { Form, WithdrawalContainer } from "./withdrawal-cashier.styles";
import MultiStepForm, { FormWrapper } from "../../../components/MultiStepForm";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import agent from "../../../utils/agent";
import { Lottie } from "../../../components/Lottie";
import successAnimation from "../../../public/assets/animations/success.json";
import Loader from "../../../components/Loader";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import SuccessScreen from "../../../components/SuccessScreen";
import { useRouter } from "next/router";

const CustomError = styled.div`
  width: 100%;
  text-align: center;
  color: ${theme.colors.primaryRed};
  margin-top: 10px;
`;

export default function WithdrawalCashier({
  pageTranslations,
  genericTranslations,
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [customError, setCustomError] = useState("");

  const { backBtnTxt } = pageTranslations;

  const router = useRouter();

  const { accountId } = router.query;

  const withdrawFromAccount = useMutation(
    ({ accountId, body }) => agent().withdrawFromAccount({ accountId, body }),
    {
      onSuccess: () => {
        setHasSubmitted(true);
        setCustomError("");
      },
      onError: (error) => {
        console.error(error?.response?.data?.details[0]);
        if (error?.response?.data?.details[0]?.type === "custom") {
          setCustomError(error?.response?.data?.details[0]?.message);
        }
      },
    }
  );

  useEffect(() => {}, [accountId]);

  const { withdrawalsCashierTitle } = pageTranslations;
  return hasSubmitted ? (
    <SuccessScreen
      header="Success"
      msg="Withdrawal request has been submitted!"
      btnMsg={backBtnTxt}
      onConfirm={async () => {
        await router.push({
          pathname: "/funds",
          query: { tab: "withdrawal", subTab: "bankwire", accountId: "" },
        });
        setHasSubmitted(false);
      }}
    />
  ) : (
    <WithdrawalContainer style={{ position: "relative" }}>
      <Loader isLoading={withdrawFromAccount.isLoading} />
      <Form onSubmit={(e) => e.preventDefault()}>
        <TitleH1
          fweight={"700"}
          fsize={"14px"}
          lheight={"17px"}
          mb={"77px"}
          txtcolor={theme.colors.secondaryBlack}
        >
          {withdrawalsCashierTitle}
        </TitleH1>
        <MultiStepForm
          maxPages={3}
          initialFormState={{
            accountId: accountId || "",
            amount: "",
            currency: "",
            bank_details: {
              bank_address: "",
              account_name: "",
              bank_name: "",
              account_number: "",
              bic_swift: "",
              iban: "",
              country: "",
            },
          }}
          onSubmit={(values) => {
            withdrawFromAccount.mutate({
              accountId: values.accountId,
              body: {
                amount: values.amount,
                bank_details: values.bank_details,
                currency: values.currency,
              },
            });
          }}
        >
          {({ nextPage, prevPage, formState }) => {
            return (
              <>
                <FormWrapper page={1}>
                  <FirstStep
                    nextPage={nextPage}
                    initialValues={formState}
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                </FormWrapper>
                <FormWrapper page={2}>
                  <SecondStep
                    nextPage={nextPage}
                    prevPage={prevPage}
                    initialValues={formState}
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                </FormWrapper>
                <FormWrapper page={3}>
                  <ThirdStep
                    nextPage={nextPage}
                    prevPage={prevPage}
                    initialValues={formState}
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                </FormWrapper>
              </>
            );
          }}
        </MultiStepForm>
        {customError && <CustomError>{customError}</CustomError>}
      </Form>
    </WithdrawalContainer>
  );
}
