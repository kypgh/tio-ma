import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Btn = styled.button`
  background: ${({ light }) =>
    light ? theme.colors.slightGray : theme.colors.secondaryColor};
  color: ${({ light }) =>
    light ? theme.colors.mainBlack : theme.colors.mainWhite};
  border-radius: 7px;
  cursor: pointer;
  width: ${({ width }) => `${width}px` || "100%"};
  padding: 10px 20px;
  border: 1px solid
    ${({ light }) => (light ? theme.colors.slightGray : "transparent")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => size ?? "14px"};
  font-weight: ${({ weight }) => weight ?? 700};

  &:hover {
    background-color: ${({ light }) =>
      light ? theme.colors.sevenGrayDark : theme.colors.mainWhite};
    color: ${({ light }) =>
      light ? theme.colors.mainBlack : theme.colors.mainBlack};
    border: 1px solid
      ${({ light }) =>
        light ? theme.colors.sevenGrayDark : theme.colors.mainBlack};
  }

  &:disabled {
    background: ${theme.colors.silverLightGray};
    color: ${theme.colors.mainWhite};
    pointer-events: none;
  }
`;

/**
 * @typedef {Object} ButtonSecondaryProps
 * @property { String } width
 * @property { String } size
 * @property { Boolean } light
 * @property { Number } weight
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonSecondaryProps} param0
 */
export default function ButtonSecondary({
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
    <Btn width={w} size={size} weight={weight} {...rest}>
      {children}
    </Btn>
  );
}
