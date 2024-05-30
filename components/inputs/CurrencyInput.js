import { Colors } from "chart.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import { createNumberMask } from "text-mask-addons";
import { theme } from "../../styles/theme";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  gap: 5px;
  & p {
    font-size: 14px;
    color: black;
  }
`;

const InputContainerInner = styled.div`
  display: flex;
  position: relative;
  /* width: 100%; */
  & p {
    font-size: 15px;
    color: black;
  }
`;

const SymbolContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: 1px solid ${theme.colors.grayColor};
  padding: 10px;
  width: 100%;
  padding-left: 20px;
  border-radius: 5px;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    outline: none;
    border: 1px solid ${theme.colors.secondaryColor};
  }
`;

const CurrencyInput = ({
  label,
  value,
  onChange,
  decimalsAmount,
  symbol = "",
}) => {
  function handleChange(ev) {
    let _value = ev.target.value;
    if (isNaN(+_value)) return;
    const [number, decimals] = _value.split(".");
    const dotCount = _value.split(".").length - 1;
    if (dotCount > 1) return;
    if (decimals && decimalsAmount < decimals?.length) return;
    onChange(_value);
  }

  return (
    <InputContainer>
      <p>{label}</p>
      <InputContainerInner>
        <SymbolContainer>
          <p>{symbol}</p>
        </SymbolContainer>
        <Input
          type="text"
          placeholder="0"
          value={
            value
            // inputValue?.replace(/[^\d.]/g, "").includes(".")
            //   ? inputValue
            //       ?.replace(/[^\d.]/g, "")
            //       ?.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            //   : inputValue
            //       ?.replace(/[^\d.]/g, "")
            //       ?.replace(/(\d)(?=(\d{3})+(?:\.|$))/g, "$1,")
          }
          onChange={handleChange}
        />
      </InputContainerInner>
    </InputContainer>
  );
};

export default CurrencyInput;
