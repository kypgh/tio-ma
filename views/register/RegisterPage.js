import { getCookie } from "cookies-next";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import * as Yup from "yup";
import "yup-phone";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import Loader from "../../components/Loader";
import { TitleH1 } from "../../components/Typography";
import Dropdown from "../../components/inputs/Dropdown";
import FormInput from "../../components/inputs/FormInput";
import PhoneInput from "../../components/inputs/PhoneInput";
import aLinks from "../../config/aLinks";
import { countryDataCodes } from "../../config/countries";
import {
  ButtonContainer,
  InputContainer,
  LoginMainContainer,
  MainContainer,
} from "../../styles/sharedstyles";
import { theme } from "../../styles/theme";
import agent from "../../utils/agent";
import { parseError } from "../../utils/functions";
import useDevice from "../../utils/hooks/useDevice";
import useWindowSize from "../../utils/hooks/useWindowSize";
import { TioImgIcons } from "../login/login.styles";
import { IconImgPass } from "./register.styles";
import { MultiSelect } from "@/components/MultiSelect";
import styled from "styled-components";
import Image from "next/image";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.object()
    .required()
    .test("phone", "Phone number is not valid", (value) => {
      const phone = `+${value?.code} ${value?.phone}`;
      return Yup.string().phone().isValidSync(phone);
    }),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & > img {
    object-fit: cover;
  }
`;

const countriesWithFlags = countryDataCodes.map((el) => ({
  value: el.iso2.toUpperCase(),
  label: (
    <Flex>
      <Image
        src={`assets/flags/${el.iso2}.svg`}
        alt={el.name}
        width={25}
        height={15}
      />
      {el.name}
    </Flex>
  ),
  searchTerm: el.name,
}));
export default function RegisterPage({ pageTranslations }) {
  const router = useRouter();
  const { locale } = router;
  const { createAccount } = pageTranslations;

  const { width } = useWindowSize();

  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isPassError, setIsPassError] = useState(false);

  const device = useDevice();

  const initCountry = getCookie("country") || "";

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    return () => {
      setIsHydrated(false);
    };
  }, []);

  return (
    <>
      <MainContainer>
        <TitleH1
          fweight={"700"}
          fsize={"22px"}
          lheight={"27px"}
          mb={"26px"}
          txtcolor={theme.colors.secondaryBlack}
          style={{
            textAlign: width < 768 ? "center" : "left",
            width: "100%",
          }}
        >
          {createAccount}
        </TitleH1>
        {isHydrated && (
          <Formik
            validationSchema={registerSchema}
            initialValues={{
              email: "",
              password: "",
              phone: "",
              first_name: "",
              last_name: "",
              country: initCountry,
              language: locale,
            }}
            validateOnChange={false}
            onSubmit={async (values) => {
              setIsPassError(false);
              setIsLoading(true);
              const utms =
                JSON.parse(window.localStorage.getItem("utm") || "{}") || {};
              const phone = `+${values.phone.code} ${values.phone.phone}`;

              await agent()
                .registerUserVerify({
                  ...values,
                  phone,
                  entity: "TIOSV",
                  terms,
                  metadata: {
                    ip: getCookie("ip"),
                    deviceType: device,
                    ip_country: getCookie("country"),
                    ip_city: getCookie("city"),
                    ...utms,
                  },
                })
                .then(async (res) => router.push("/dashboard"))
                .catch((err) => {
                  if (
                    err?.response?.data?.details?.some((el) =>
                      el?.path?.includes("password")
                    )
                  ) {
                    setIsPassError(true);
                  }
                  setError(parseError(err, "password"));
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}
          >
            {({
              handleSubmit,
              errors,
              handleChange,
              setFieldValue,
              validateForm,
              values,
            }) => (
              <LoginMainContainer
                style={{
                  position: "relative",
                }}
              >
                {<Loader isLoading={isLoading} />}
                <InputContainer style={{ gap: "15px" }}>
                  <FormInput
                    type="text"
                    error={errors.first_name}
                    placeholder="First Name"
                    name="first_name"
                    onChange={handleChange}
                  />
                  <FormInput
                    type="text"
                    error={errors.last_name}
                    placeholder="Last Name"
                    name="last_name"
                    onChange={handleChange}
                  />
                  <FormInput
                    error={errors.email}
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange}
                  />
                  <IconImgPass
                    style={{
                      position: "relative",
                    }}
                  >
                    <FormInput
                      type={isRevealPwd ? "text" : "password"}
                      error={errors.password}
                      autoComplete="new-password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                    <TioImgIcons
                      title={isRevealPwd ? "Hide password" : "Show password"}
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                      alt="icon"
                      width={15}
                      height={15}
                    >
                      {isRevealPwd ? <RxEyeOpen /> : <RxEyeClosed />}
                    </TioImgIcons>
                  </IconImgPass>
                  <MultiSelect
                    singleSelect
                    label={"Country"}
                    options={countriesWithFlags}
                    onChange={([value]) => {
                      setFieldValue("country", value);
                    }}
                    value={[values.country]}
                    error={errors.country}
                  />

                  <PhoneInput
                    label={"Phone Number"}
                    name="phone"
                    placeholder={"Phone Number"}
                    getValues={({ code, phone }) => {
                      setFieldValue("phone", { code, phone });
                    }}
                    defaultIso2={initCountry}
                    error={errors.phone}
                  />

                  <div>
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      onChange={(e) => {
                        setTerms(e.target.checked);
                      }}
                      value={terms}
                    />
                    <label
                      htmlFor="terms"
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "400",
                        textAlign: "center",
                      }}
                    >
                      I accept the Terms & Conditions and{" "}
                      <Link
                        style={{
                          color: theme.colors.primaryBlue,
                        }}
                        href={`${process.env.NEXT_PUBLIC_TIO_MARKETS_URL}/legal-documents/privacy-policy`}
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </InputContainer>
                <ButtonContainer>
                  <ButtonPrimary
                    width={"395px"}
                    type="button"
                    onClick={async () => {
                      const errors = await validateForm();
                      if (Object.keys(errors).length === 0) {
                        handleSubmit();
                      }
                    }}
                    disabled={!terms || isLoading}
                  >
                    Sign Up
                  </ButtonPrimary>
                </ButtonContainer>
                {isPassError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "400",
                      width: "100%",
                    }}
                  >
                    Password must contain:
                  </p>
                )}
                {error && (
                  <ul
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontWeight: "400",
                      marginBottom: "15px",
                      width: "100%",
                      paddingLeft: "20px",
                    }}
                  >
                    {error?.split("\n").map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                )}
                <div style={{ color: "#000" }}>
                  Already have an account?{" "}
                  <Link
                    href={aLinks.index}
                    style={{
                      color: theme.colors.primaryBlue,
                    }}
                  >
                    Login
                  </Link>
                </div>
              </LoginMainContainer>
            )}
          </Formik>
        )}
      </MainContainer>
    </>
  );
}
