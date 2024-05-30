import React, { useMemo } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { theme } from "../../../styles/theme";
import {
  useGetUserAccountById,
  useGetExchangeRate,
} from "../../../utils/hooks/queryHooks";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { Dflex } from "../../../styles/sharedstyles";
import FormInput from "../../../components/inputs/FormInput";
import { formatCurrency } from "../../../utils/functions";
import Loader from "@/components/Loader";

const BtnContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 15px;
`;

const SecondStep = ({
  initialValues,
  pageTranslations,
  nextPage = () => {},
  prevPage = () => {},
}) => {
  const { data, isLoading } = useGetUserAccountById(initialValues.accountId);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required()
      .min(data?.minWithdrawalInAccountCurrency || 0)
      .max(
        Number(data?.account?.balance),
        `Available balance is ${formatCurrency(
          Number(data?.account?.balance),
          initialValues?.currency
        )} cannot withdraw more`
      )
      .label("Amount"),
  });

  const { amountEurLabel, backBtnTxt, nextBtnTxt } = pageTranslations;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={nextPage}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Dflex column style={{ gap: "20px", padding: "10px" }}>
          <Loader isLoading={isLoading} />
          <FormInput
            width={"345px"}
            label={`${amountEurLabel?.split(" ")[0]} (${
              initialValues.currency
            })`}
            color={theme.colors.mainWhite}
            onChange={handleChange}
            name="amount"
            value={values.amount}
            type="number"
            min="0"
            error={errors.amount}
          />
          <BtnContainer>
            <ButtonPrimary
              disabled={!values.accountId}
              onClick={() => prevPage()}
            >
              {backBtnTxt}
            </ButtonPrimary>
            <ButtonPrimary
              onClick={handleSubmit}
              disabled={
                Object.keys(errors).length > 0 || !values.amount || isLoading
              }
            >
              {nextBtnTxt}
            </ButtonPrimary>
          </BtnContainer>
        </Dflex>
      )}
    </Formik>
  );
};

export default SecondStep;
