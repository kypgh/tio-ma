import { theme } from "@/styles/theme";
import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & > label {
    user-select: none;
    cursor: pointer;
    font-size: 14px;
  }
`;

const CusCheckbox = styled.input`
  &[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    border: 1px solid ${theme.colors.primaryBlue};
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: all 150ms ease;
  }

  &[type="checkbox"]:checked::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${theme.colors.primaryBlue};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Checkbox = ({ onChange, checked, id, children }) => {
  return (
    <Flex>
      <CusCheckbox
        type="checkbox"
        id={id || children}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id || children}>{children}</label>
    </Flex>
  );
};

export default Checkbox;
