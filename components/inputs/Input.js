import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles/device";
import { theme } from "../../styles/theme";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { set } from "nprogress";

const Outer = styled.div`
  display: flex;
  flex-direction: ${({ row }) => row ?? "column"};
  align-items: ${({ row }) => row && "center"};
  width: ${({ width }) => width ?? "100%"};
  gap: 5px;
  position: relative;

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

const CusLabel = styled.label`
  color: ${theme.colors.mainBlack};
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
`;

const CusInput = styled.input`
  border: 1px solid ${theme.colors.silverLightGray};
  border-radius: 3px;
  padding: 8px 10px;
  font-size: 13px;
  width: 100%;

  &[data-error="true"] {
    border-color: ${theme.colors.primaryRed};
  }

  &:focus {
    outline: none;
    border: 1px solid ${theme.colors.secondaryColor};
  }

  &:read-only {
    cursor: default;
    user-select: none;
  }
`;

const Icon = styled.div`
  position: absolute;
  bottom: 6px;
  right: 10px;
  cursor: pointer;
`;

/**
 * @typedef {Object} InputPropsTemp
 * @property { String } label
 * @property { String } width
 * @property { Boolean } row
 * @property { Boolean } readOnly
 * @property { React.CSSProperties } outerStyle
 * @property { String } error
 * @param { InputPropsTemp & React.InputHTMLAttributes<InputProps> } param0
 */
const Input = ({
  width,
  row,
  label,
  readOnly,
  type,
  outerStyle,
  error,
  ...rest
}) => {
  const [w, setW] = useState(width);
  const ref = useRef(null);
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const [tipos, setTipos] = useState(type);

  const isPassword = type === "password";

  useEffect(() => {
    if (ref.current) {
      width += ref.current.offsetWidth;
    }
    if (typeof width === "number") {
      setW(`${width}px`);
    } else {
      setW(width);
    }
  }, [width]);

  const cusId = rest.id || rest.name || label || "cus-input-id";
  return (
    <Outer row={row} width={w} style={outerStyle}>
      <CusLabel htmlFor={cusId}>{label}</CusLabel>
      <CusInput
        id={cusId}
        type={tipos}
        {...rest}
        readOnly={readOnly}
        data-error={!!error}
      />
      {isPassword && (
        <Icon>
          {isRevealPassword ? (
            <RxEyeOpen
              onClick={() => {
                setIsRevealPassword(false);
                setTipos("password");
              }}
            />
          ) : (
            <RxEyeClosed
              onClick={() => {
                setIsRevealPassword(true);
                setTipos("text");
              }}
            />
          )}
        </Icon>
      )}
    </Outer>
  );
};

export default Input;
