import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import ButtonPrimary from "./Buttons/ButtonPrimary";
import { device } from "../styles/device";

const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 25px;
`;

const OtpInputCs = styled.input`
  width: 50px;
  height: 50px;
  border: 1px solid ${theme.colors.mainBlack};
  border-radius: 5px;
  font-size: 20px;
  text-align: center;
  outline: none;
  transition: 0.1s all ease;
  &:focus {
    border: 1px solid ${theme.colors.primaryColor};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media ${device.mobile} {
    width: 30px;
    height: 30px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const OtpInput = ({
  onSubmit = (otp) => {},
  onBack = () => {},
  isLoading = false,
  submitBtnText = "Submit",
  backBtnText = "Back",
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    // Update the digit at the current index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move the cursor to the next input field if a digit has been entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput.focus();
    }
  };

  return (
    <>
      <OtpContainer>
        {otp.map((item, index) => (
          <OtpInputCs
            key={index}
            id={`otp-${index}`}
            name={`otp-${index}`}
            autoComplete="off"
            value={item}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !item) {
                if (index > 0) {
                  const nextInput = document.getElementById(`otp-${index - 1}`);
                  nextInput.focus();
                }
              }
            }}
            onInput={(e) => {
              const numberRegex = /^[0-9]*$/;
              if (
                numberRegex.test(e.target.value) &&
                e.target.value.length === 6
              ) {
                setOtp([...e.target.value.split("")]);
                document.getElementById(`otp-5`).focus();
                return;
              }
              if (numberRegex.test(e.target.value)) {
                if (e.target.value.length > 1) {
                  handleChange(index, e.target.value[1]);
                } else {
                  handleChange(index, e.target.value);
                }
              }
            }}
          />
        ))}
      </OtpContainer>
      <BtnContainer>
        <ButtonPrimary
          onClick={() => {
            setOtp(["", "", "", "", "", ""]);
            onBack();
          }}
        >
          {backBtnText}
        </ButtonPrimary>
        <ButtonPrimary
          disabled={!otp.every((x) => x) || isLoading}
          onClick={() => {
            onSubmit(otp.join(""));
          }}
        >
          {submitBtnText}
        </ButtonPrimary>
      </BtnContainer>
    </>
  );
};

export default OtpInput;
