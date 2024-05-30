import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { device } from "../../styles/device";

const CusSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 18px;
  min-width: 32px;
  min-height: 18px;
  pointer-events: ${({ isLoading }) => (isLoading ? "none" : "auto")};
  opacity: ${({ isLoading }) => (isLoading ? "0.7" : "1")};
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: ${theme.colors.primaryBlue};
  }

  &:focus + .slider {
    box-shadow: 0 0 1px ${theme.colors.primaryBlue};
  }
  &:checked + .slider:before {
    transform: translateX(14px);
  }
`;

const Span = styled.span`
  border-radius: 7px;

  &.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
  }

  &.slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? "reverse" : "column")};
  gap: 7px;
`;

const Label = styled.label`
  font-size: 16px;
  color: ${theme.colors.mainBlack};

  @media ${device.mobile} {
    text-align: left;
  }
`;

/**
 * @typedef {Object} SwitchProps
 * @property { String } label
 * @property { Boolean } row
 * @property { Boolean } isLoading
 * @property { Function } onChange
 * @param {React.InputHTMLAttributes<HTMLInputElement> & SwitchProps} param0
 */
const Switch = ({ onChange = () => {}, label, row, isLoading, ...rest }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  const cusId = rest.id || rest.name || label || "switch-id";

  return (
    <Container row={row}>
      <Label htmlFor={cusId}>{label}</Label>
      <CusSwitch isLoading={isLoading}>
        <Input
          id={cusId}
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          {...rest}
        />
        <Span className="slider"></Span>
      </CusSwitch>
    </Container>
  );
};

export default Switch;
