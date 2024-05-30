import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles/device";
import { theme } from "../../styles/theme";

const Outer = styled.div`
  position: relative;
  padding: 7px;
  border: 1px solid ${theme.colors.silverLightGray};
  border-radius: 3px;
  background-color: ${theme.colors.mainWhite};
  max-width: ${({ width }) => width}px;
  width: 100%;
  margin-top: 10px;
  font-size: 13px;
  height: fit-content;
  border-radius: 0 3px 3px 3px;

  &[data-error="true"] {
    border: 1px solid ${theme.colors.primaryRed};
    margin-bottom: 20px;
  }

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

const InputField = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.mainWhite} !important;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: transparent;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.mainWhite} inset;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 7px;
  background-color: inherit;
  padding: 0 5px 3px 5px;
  font-size: 14px;
  font-weight: 500;
  transition: 0.15s all ease;
  pointer-events: none;
  color: ${theme.colors.silverLightGray};

  ${InputField}:focus ~ &,
  ${InputField}[data-valid = true] ~ &,
  ${InputField}:not(:placeholder-shown) ~ & {
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: ${theme.colors.mainBlack};
  }

  ${InputField}:focus ~ &::after, 
  ${InputField}[data-valid = true] ~ &::after,
  ${InputField}:not(:placeholder-shown) ~ &::after {
    content: "";
    border: 1px solid ${theme.colors.silverLightGray};
    border-bottom: none;
    border-radius: 2px 2px 0 0;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: calc(50% - 0.5px);
    z-index: -1;
  }

  // Error
  ${InputField}[data-error = true]:focus ~ &,
  ${InputField}[data-valid = true][data-error = true] ~ & {
    border-top: 1px solid ${theme.colors.primaryRed};
  }

  ${InputField}[data-valid = true][data-error = true] ~ &::after ,
  ${InputField}[data-error = true]:focus ~ &::after {
    content: "";
    border: 1px solid ${theme.colors.primaryRed};
    border-bottom: none;
    border-radius: 2px 2px 0 0;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: calc(50% - 0.5px);
    z-index: -1;
  }
`;

const ErrorField = styled.div`
  font-size: 12px;
  color: ${theme.colors.primaryRed};
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
`;

/**
 *
 * @typedef {Object} FormInputProps
 * @property { String } label
 * @property { String } width
 * @property { String } error
 * @property { String|Number} value
 * @property { (e) => {} } onChange
 * @param {React.InputHTMLAttributes<HTMLInputElement> & FormInputProps} param0
 */
const FormInput = ({ width, label, error, ...rest }) => {
  const [w, setW] = useState();

  useEffect(() => {
    setW(String(width)?.replaceAll("px", ""));
  }, [width]);

  const elementRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const element = elementRef.current;
      const lineHeight =
        parseInt(window.getComputedStyle(element).lineHeight) || 20;
      const elementHeight = element.offsetHeight;

      if (elementHeight > lineHeight) {
        const currentFontSize = parseInt(
          window.getComputedStyle(element).fontSize
        );
        const newFontSize = currentFontSize - 1.5;
        element.style.fontSize = newFontSize + "px";
      } else {
        const currentFontSize = parseInt(
          window.getComputedStyle(element).fontSize
        );
        const newFontSize = currentFontSize + 1.5;
        if (newFontSize > 14) return;
        element.style.fontSize = newFontSize + "px";
      }
    };

    adjustFontSize();

    window.addEventListener("resize", adjustFontSize);
    return () => {
      window.removeEventListener("resize", adjustFontSize);
    };
  }, [elementRef.current]);

  return (
    <>
      <Outer
        width={w}
        data-error={!!error}
        data-valid={!!rest.value || !!rest.defaultValue}
      >
        <InputField
          data-valid={!!rest.value || !!rest.defaultValue}
          data-error={!!error}
          placeholder={label}
          {...rest}
        />
        <Label ref={elementRef}>{label || rest.placeholder}</Label>
        <ErrorField>{error}</ErrorField>
      </Outer>
    </>
  );
};

export default FormInput;
