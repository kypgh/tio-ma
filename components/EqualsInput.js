import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const Shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  padding: 10px 0;
`;

const InputContainer = styled.div`
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.3s all ease-in-out;

  & > span {
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    transition: all 0.1s ease-in-out;

    &:hover {
      color: #777777;
    }
  }

  .animate & {
    animation: ${Shake} 0.5s;
    border: 1px solid red;
  }
`;

const CusInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  padding: 5px;
`;

const symbols = ["≥", "=", "≤"];
const symbolValues = {
  "=": "eq",
  "≥": "ge",
  "≤": "le",
};

const EqualsInput = ({ label, onChange, ...rest }) => {
  const [symbol, setSymbol] = useState(0);
  const [value, setValue] = useState("");

  const refToRemoveClass = useRef(null);

  useEffect(() => {
    onChange({
      value: value,
      symbolValue: symbolValues[symbols[symbol]],
      symbol: symbols[symbol],
    });
  }, [symbol]);

  return (
    <Outer {...rest} ref={refToRemoveClass}>
      <p>{label}</p>
      <InputContainer>
        <span
          onClick={() => {
            setSymbol((symbol + 1) % 3);
          }}
        >
          {symbols[symbol]}
        </span>
        <CusInput
          value={value}
          onChange={(e) => {
            refToRemoveClass.current.classList.remove("animate");

            setValue(e.target.value);
            onChange({
              value: e.target.value,
              symbolValue: symbolValues[symbols[symbol]],
              symbol: symbols[symbol],
            });
          }}
          type="number"
        />
      </InputContainer>
    </Outer>
  );
};

export default EqualsInput;
