import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 180px;
  width: 100%;
`;

const Label = styled.label`
  color: ${theme.colors.mainBlack};
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
`;

const Date = styled.input`
  border: none;
  padding: 7px 10px;
  outline: none;
  border: 1px solid ${theme.colors.silverLightGray};
  border-radius: 3px;
`;

/**
 * @typedef {Object} DateInputProps
 * @property { String } label
 * @param { DateInputProps & React.InputHTMLAttributes<DateInputProps> } props
 */
const DateInput = ({ label, ...rest }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Date type={"date"} {...rest} />
    </Container>
  );
};

export default DateInput;
