import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Formik } from "formik";
import * as Yup from "yup";
import DateInput from "../../../components/inputs/DateInput";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import { useCurrentUser } from "../../../utils/hooks/queryHooks";
import { useMutation, useQueryClient } from "react-query";
import agent from "../../../utils/agent";
import { countryDataCodes } from "../../../config/countries";
import Loader from "../../../components/Loader";
import { setCookies } from "cookies-next";
import { GoVerified } from "react-icons/go";
import Dropdown from "../../../components/inputs/Dropdown";
import FormInput from "../../../components/inputs/FormInput";

const Outer = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${theme.colors.mainBlack};
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: flex-end;
  /* justify-content: center; */
  gap: 15px;
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
  margin: auto;
`;

const Full = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonaInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f5f6;
  & h2 {
    width: 100%;
    text-align: start;
  }
  & > div {
    /* max-height: 20px; */
    align-self: flex-end;
    max-width: calc(100% / 2 - 20px / 2);
    /* min-width: 200px; */
  }
  @media only screen and (max-width: 650px) {
    & > div {
      max-width: 100%;
    }
  }
`;

const InformationVerification = ({ pageTranslations }) => {
  const {
    personalInformationTitle,
    perTitleLabel,
    perGenderLabel,
    perDateofBirthLabel,
    perCountryLabel,
    perNationalityLabel,
    perNationalIdentiLabel,
    perFullAddressLabel,
    perCityLabel,
    perHouseNumberLabel,
    perUnitNumberLabel,
    perZipCodeLabel,
    submitBtnTxt,
  } = pageTranslations;

  const [editting, setEditting] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of birth is required"),
    country: Yup.string().required("Country is required"),
    nationality: Yup.string().required("Nationality is required"),
    identificationNumber: Yup.string().required("National ID is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    houseNumber: Yup.string().required("House number is required"),
    unitNumber: Yup.string().required("Unit number is required"),
    postcode: Yup.string().required("Zip code is required"),
  });

  const { data: currentUser, isLoading, isFetched } = useCurrentUser();

  const {
    title,
    gender,
    dob,
    country,
    nationality,
    identificationNumber,
    address,
    city,
    houseNumber,
    unitNumber,
    postcode,
  } = currentUser;

  const queryClient = useQueryClient();

  const verifyDetails = useMutation(
    (values) => agent().verifyUserDetails(values),
    {
      onSuccess: () => {
        setEditting(false);
        setCookies("token", "", { path: "/" });
        queryClient.invalidateQueries(["currentUser"]);
      },
    }
  );

  const titleOptions = [
    { value: "Mrs", name: "Mrs" },
    { value: "Mr", name: "Mr" },
    { value: "Ms", name: "Ms" },
    { value: "Dr", name: "Dr" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  if (isLoading) return <Loader isLoading={isLoading} />;

  return !currentUser.flags?.detailsVerified || editting ? (
    <Outer>
      {isFetched && (
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            title: title || "",
            gender: gender || "",
            dob: dob?.split("T")[0] || "",
            country: country || "",
            nationality: nationality || "",
            identificationNumber: identificationNumber || "",
            address: address || "",
            city: city || "",
            houseNumber: houseNumber || "",
            unitNumber: unitNumber || "",
            postcode: postcode || "",
          }}
          validateOnMount={true}
          onSubmit={(values) => {
            verifyDetails.mutate(values);
          }}
        >
          {({ values, handleChange, handleSubmit, isValid }) => (
            <FormContainer>
              <PersonaInfoContainer>
                <Title>{personalInformationTitle}</Title>
                <Dropdown
                  name="title"
                  options={titleOptions}
                  value={values.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label={perTitleLabel}
                  width={"150px"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
                <Dropdown
                  name="gender"
                  options={genderOptions}
                  value={values.gender}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label={perGenderLabel}
                  width={"150px"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
                <DateInput
                  name="dob"
                  label={perDateofBirthLabel}
                  value={values.dob}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <Dropdown
                  name="country"
                  options={countryDataCodes.map((v) => ({
                    value: v.iso2.toUpperCase(),
                    label: v.name,
                  }))}
                  value={values.country}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label={perCountryLabel}
                  width={"250px"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                />
              </PersonaInfoContainer>
              <PersonaInfoContainer>
                <Title>{perNationalityLabel}</Title>
                <Dropdown
                  name="nationality"
                  options={countryDataCodes.map((v) => ({
                    value: v.iso2.toUpperCase(),
                    label: v.nationality,
                  }))}
                  value={values.nationality}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label={perNationalityLabel}
                  width={"250px"}
                />
                <FormInput
                  name="identificationNumber"
                  label={perNationalIdentiLabel}
                  value={values.identificationNumber}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color="white"
                  width={"300px"}
                />
                <FormInput
                  name="address"
                  label={perFullAddressLabel}
                  value={values.address}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color="white"
                  width={"350px"}
                />
                <FormInput
                  name="city"
                  label={perCityLabel}
                  value={values.city}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color="white"
                  width={"188.75px"}
                />
                <FormInput
                  name="houseNumber"
                  label={perHouseNumberLabel}
                  value={values.houseNumber}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color="white"
                  width={"188.75px"}
                />
                <FormInput
                  name="unitNumber"
                  label={perUnitNumberLabel}
                  value={values.unitNumber}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color="white"
                  width={"188.75px"}
                />
                <FormInput
                  name="postcode"
                  label={perZipCodeLabel}
                  value={values.postcode}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color="white"
                  width={"188.75px"}
                />
              </PersonaInfoContainer>
              <Full>
                <ButtonPrimary
                  style={{ width: "100%", maxWidth: "350px" }}
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  {submitBtnTxt}
                </ButtonPrimary>
              </Full>
            </FormContainer>
          )}
        </Formik>
      )}
    </Outer>
  ) : (
    <AlreadyVerified
      setEditting={setEditting}
      pageTranslations={pageTranslations}
    />
  );
};

export default InformationVerification;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title2 = styled.h2`
  font-size: 20px;
  color: ${theme.colors.mainBlack};
  font-weight: 700;
`;

const AlreadyVerified = ({ setEditting, pageTranslations }) => {
  const { perDetailsIsVerified, editBtnTxt } = pageTranslations;

  return (
    <Container>
      <Title2>{perDetailsIsVerified}</Title2>
      <GoVerified size={100} />
      <ButtonPrimary onClick={() => setEditting(true)}>
        {editBtnTxt}
      </ButtonPrimary>
    </Container>
  );
};
