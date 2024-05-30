import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles/device";
import { theme } from "../../styles/theme";
import { formatArrayForSelect } from "../../utils/functions";

const Outer = styled.div`
  display: flex;
  flex-direction: ${({ row }) => row ?? "column"};
  align-items: ${({ row }) => row && "center"};
  gap: 5px;
  max-width: ${({ width }) => `${width}px` ?? "100%"};
  width: 100%;
  position: relative;

  &[data-error="true"] {
    margin-bottom: 20px;
  }

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

const CusSelect = styled.select`
  border: 1px solid ${theme.colors.silverLightGray};
  border-radius: 3px;
  padding: 7px 10px;
  font-size: 13px;
  width: 100%;

  &:focus {
    outline: none;
    border: 1px solid ${theme.colors.secondaryColor};
  }

  & option {
    color: ${theme.colors.mainBlack};
    padding: 3px;
    font-size: 12px;
  }

  & option:disabled,
  & option[value=""] {
    color: ${theme.colors.silverLightGray};
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
 * @typedef {Object} SelectAccountPropsTemp
 * @property { String } label
 * @property { String } optionLabel
 * @property { String } width
 * @property { Boolean } row
 * @property { String } error
 * @property { Array<{ label: String, value: String|Number }> } options
 * @property { Boolean } disabledDefaultOption
 * @property { Object } formatterObject
 * @param {React.SelectHTMLAttributes<HTMLSelectElement> & SelectAccountPropsTemp} param0
 */
const Dropdown = ({
  label = "Select",
  optionLabel = "Please select",
  width,
  row,
  options,
  disabledDefaultOption = true,
  formatterObject = {},
  error,
  ...props
}) => {
  const [w, setW] = useState(width);
  const ref = useRef(null);

  useEffect(() => {
    setW(String(width)?.replaceAll("px", ""));
  }, [width]);

  const cusId =
    props.id ||
    props.name ||
    label ||
    options[0]?.label ||
    options[0]?.value ||
    "select-id";

  return (
    <Outer row={row} width={w} data-error={!!error}>
      <CusLabel htmlFor={cusId} ref={ref}>
        {label}
      </CusLabel>
      <ErrorField>{error}</ErrorField>
      <CusSelect id={cusId} {...props}>
        <option value="" disabled={disabledDefaultOption}>
          {optionLabel}
        </option>
        {formatArrayForSelect(options).map((option, index) => (
          <option key={index} value={option.value}>
            {formatterObject[option.label] ?? option.label}
          </option>
        ))}
      </CusSelect>
    </Outer>
  );
};

export default Dropdown;
