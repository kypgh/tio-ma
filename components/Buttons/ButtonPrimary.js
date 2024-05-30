import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { device } from "../../styles/device";

const CusButton = styled.button`
  background: ${theme.colors.primaryButtonLinearBG};
  color: ${theme.colors.mainWhite};
  font-weight: ${({ weight }) => weight || 700};
  font-size: ${({ size }) => size || "14px"};
  border-radius: 8px;
  padding: 10px 20px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease-in;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  width: ${({ width }) => `${width}px` || "100%"};

  &:hover {
    /* border: 1px solid ${theme.colors.primaryColor}; */
    background-position-x: -10px;
  }

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

/**
 * @typedef {Object} ButtonPrimaryProps
 * @property { String } width
 * @property { String } size
 * @property { Boolean } light
 * @property { Number } weight
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonPrimaryProps} param0
 */
export default function ButtonPrimary({
  children,
  width,
  size,
  weight,
  ...rest
}) {
  const [w, setW] = useState(width);
  useEffect(() => {
    setW(String(width)?.replaceAll("px", ""));
  }, [width]);

  return (
    <CusButton width={w} size={size} weight={weight} {...rest}>
      {children}
    </CusButton>
  );
}
