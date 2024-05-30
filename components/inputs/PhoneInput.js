import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import styled from "styled-components";
import { countryDataCodes } from "../../config/countries";
import { theme } from "../../styles/theme";
import { MultiSelect } from "../MultiSelect";
import Input from "./Input";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;

  &[data-error="true"] {
    margin-bottom: 20px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;

  &[data-error="true"] {
    align-items: center;
  }

  & > * {
    flex: 1;
  }
`;

const Verified = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${theme.colors.secondaryColor};
`;

const ErrorField = styled.div`
  font-size: 12px;
  color: ${theme.colors.primaryRed};
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
`;

const F = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & > img {
    object-fit: cover;
  }
`;

const PhoneInput = ({
  label,
  verifiedLabel,
  placeholder,
  onChange = (phone) => {},
  getValues = ({ code, phone }) => {},
  name,
  error,
  defaultIso2,
  ...rest
}) => {
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setPhone(`+${countryCode}${phoneNumber}`);
    getValues({ code: countryCode, phone: phoneNumber });
  }, [countryCode, phoneNumber]);

  useEffect(() => {
    onChange(phone);
  }, [phone]);

  useEffect(() => {
    if (defaultIso2) {
      const code = countryDataCodes.find(
        (el) => el.iso2.toLowerCase() === defaultIso2.toLowerCase()
      );
      setCountryCode(code?.dialCode);
    }
  }, []);

  const cusId = rest.id || rest.name || label || "phone-input-id";

  return (
    <Outer data-error={!!error}>
      <Flex data-error={!!error}>
        <MultiSelect
          singleSelect
          label={<CustomLabel label={label} verifiedLabel={verifiedLabel} />}
          id={cusId}
          options={countryDataCodes.map((el) => ({
            value: el.dialCode,
            label: (
              <F>
                <Image
                  src={`assets/flags/${el.iso2}.svg`}
                  alt={el.name}
                  width={25}
                  height={15}
                />
                <span>
                  {`${el.name.replace(/\(.*\)/g, "")} (+${el.dialCode})`}
                </span>
              </F>
            ),
            searchTerm: el.name,
          }))}
          onChange={([value]) => {
            setCountryCode(value);
          }}
          value={[countryCode]}
          error={error}
        />
        <Input
          style={{
            padding: "5px 10px",
          }}
          value={phoneNumber}
          placeholder={placeholder}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          error={error}
        />
      </Flex>
    </Outer>
  );
};

export default PhoneInput;

const CustomLabel = ({ label, verifiedLabel }) => {
  return (
    <Flex>
      <span>{label}</span>
      {verifiedLabel && (
        <Flex>
          <MdOutlineVerified color={theme.colors.secondaryColor} />
          <Verified>{verifiedLabel}</Verified>
        </Flex>
      )}
    </Flex>
  );
};
