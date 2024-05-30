import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../../components/inputs/FormInput";
import Dropdown from "../../../components/inputs/Dropdown";
import { countryDataCodes } from "../../../config/countries";
import { theme } from "../../../styles/theme";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";

const InputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 15px;
  & > * {
    /* flex: 1; */
    max-width: calc(50% - 15px);
    width: 100%;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
`;

const ThirdStep = ({
  initialValues,
  pageTranslations,
  nextPage = () => {},
  prevPage = () => {},
}) => {
  const validationSchema = Yup.object().shape({
    bank_details: Yup.object().shape({
      bank_address: Yup.string().required().label("Bank Address"),
      account_name: Yup.string().required().label("Account Name"),
      bank_name: Yup.string().required().label("Bank Name"),
      account_number: Yup.string().required().label("Account Number"),
      bic_swift: Yup.string().label("BIC/SWIFT"),
      iban: Yup.string().label("IBAN"),
      country: Yup.string().required().label("Country"),
    }),
  });

  const {
    bankAddressLabel,
    accountNameLabel,
    bankNameLabel,
    accountNumberLabel,
    bicSwiftLabel,
    iBanLabel,
    countryLabel,
    backBtnTxt,
    nextBtnTxt,
  } = pageTranslations;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={nextPage}
    >
      {({ handleSubmit, handleChange, values, errors }) => {
        const isDisabled = Object.keys(errors.bank_details || {}).length > 0;
        return (
          <>
            <InputsContainer>
              <FormInput
                label={bankAddressLabel}
                name="bank_details.bank_address"
                value={values.bank_details.bank_address}
                onChange={handleChange}
                error={errors.bank_details?.bank_address}
              />
              <FormInput
                label={accountNameLabel}
                name="bank_details.account_name"
                value={values.bank_details.account_name}
                onChange={handleChange}
                error={errors.bank_details?.account_name}
              />
              <FormInput
                label={bankNameLabel}
                name="bank_details.bank_name"
                value={values.bank_details.bank_name}
                onChange={handleChange}
                error={errors.bank_details?.bank_name}
              />
              <FormInput
                label={accountNumberLabel}
                name="bank_details.account_number"
                value={values.bank_details.account_number}
                onChange={handleChange}
                error={errors.bank_details?.account_number}
              />
              <FormInput
                label={bicSwiftLabel}
                name="bank_details.bic_swift"
                value={values.bank_details.bic_swift}
                onChange={handleChange}
                error={errors.bank_details?.bic_swift}
              />
              <FormInput
                label={iBanLabel}
                name="bank_details.iban"
                onChange={handleChange}
                value={values.bank_details.iban}
                error={errors.bank_details?.iban}
              />
              <Dropdown
                name="bank_details.country"
                label={countryLabel}
                options={countryDataCodes.map((el) => ({
                  value: el.iso2.toUpperCase(),
                  label: el.name,
                }))}
                width={350}
                color={theme.colors.lightGraySecondary}
                onChange={handleChange}
                value={values.bank_details.country}
              />
            </InputsContainer>
            <BtnContainer>
              <ButtonPrimary onClick={() => prevPage()}>
                {backBtnTxt}
              </ButtonPrimary>
              <ButtonPrimary onClick={handleSubmit} disabled={isDisabled}>
                {nextBtnTxt}
              </ButtonPrimary>
            </BtnContainer>
          </>
        );
      }}
    </Formik>
  );
};

export default ThirdStep;
