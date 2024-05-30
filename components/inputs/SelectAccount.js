import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { device } from "../../styles/device";
import { theme } from "../../styles/theme";
import {
  useGetUserDemoAccounts,
  useGetUserLiveAccounts,
} from "../../utils/hooks/queryHooks";
import OpenAccount from "../OpenAccount";
import { useRouter } from "next/router";

const Outer = styled.div`
  display: flex;
  flex-direction: ${({ row }) => row ?? "column"};
  align-items: ${({ row }) => row && "center"};
  gap: 5px;
  max-width: ${({ width }) => `${width}px` ?? "100%"};
  width: ${({ width }) => `${width}px` ?? "100%"};

  @media ${device.mobile} {
    max-width: 100%;
    width: 100%;
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

const mappedPlatforms = {
  mt4: "MT4",
  mt5: "MT5",
  ctrader: "cTrader",
};

/**
 * @typedef {Object} SelectAccountPropsTemp
 * @property { 'live' | 'demo' | 'both' } enviroment - The enviroment in which to display the content.
 * @property { React.CSSProperties } style
 * @property { String } label - default: "Account ID"
 * @property { String } optionsLabel - default: "Please select"
 * @property { String } width
 * @property { String|Number} value
 * @property { (e, Object) => {} } onChange
 * @property { Boolean } disableZeroBalance
 * @property { Boolean } row
 * @property { Boolean } disabledDefaultOption
 * @property { Function } filter
 * @tutorial Returns OpenAccount component if there are no accounts.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement> & SelectAccountPropsTemp} param0
 */
const SelectAccount = ({
  label = "Account ID",
  optionsLabel = "Please select",
  enviroment = "both",
  onChange = () => {},
  value,
  width,
  disableZeroBalance = false,
  filter = useCallback(() => true, []),
  row,
  disabledDefaultOption,
  style,
  ...props
}) => {
  //----- Accounts handler -----//
  const { data: liveAccounts } = useGetUserLiveAccounts({
    enabled: ["live", "both"].includes(enviroment),
  });
  const { data: demoAccounts } = useGetUserDemoAccounts({
    enabled: ["demo", "both"].includes(enviroment),
  });

  const formatOptions = () => {
    const result = {
      live:
        liveAccounts?.filter(filter)?.map((el) => ({
          value: el._id,
          name: `${mappedPlatforms[el.platform]} - ${el.login_id} (${
            el.currency
          } - ${el.balance})`,
          isDisabled: disableZeroBalance && el.balance == 0,
          ...el,
        })) || [],
      demo:
        demoAccounts?.filter(filter)?.map((el) => ({
          value: el._id,
          name: `${mappedPlatforms[el.platform]} - ${el.login_id} (${
            el.currency
          } - ${el.balance})`,
          isDisabled: disableZeroBalance && el.balance == 0,
          ...el,
        })) || [],
    };
    return result;
  };

  const [userAccounts, setUserAccounts] = useState(formatOptions());

  useEffect(() => {
    setUserAccounts(formatOptions());
  }, [liveAccounts, demoAccounts, filter]);

  //----- Dropdown Select Handler -----//
  const [w, setW] = useState(width);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const ref = useRef(null);
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setW(String(width)?.replaceAll("px", ""));
  }, [width]);

  useEffect(() => {
    if (ref.current) {
      setOffsetWidth(ref.current.offsetWidth);
    }
  }, [ref.current]);

  useEffect(() => {
    if (row) setW(width + offsetWidth);
  }, [offsetWidth]);

  const router = useRouter();
  const { accountId } = router.query;

  useEffect(() => {
    if (accountId) {
      const acc = Object.values(userAccounts)
        .flat()
        .find((el) => el._id === accountId);
      if (acc) {
        setInnerValue(accountId);
        onChange(
          { target: { value: accountId } },
          Object.values(userAccounts)
            .flat()
            .find((el) => el._id === accountId)
        );
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (value) {
      const account = Object.values(userAccounts)
        .flat()
        .find((el) => el._id === value);
      if (account) {
        setInnerValue(value);
        onChange(
          { target: { value } },
          Object.values(userAccounts)
            .flat()
            .find((el) => el._id === value)
        );
      }
    }
  }, [value]);

  const cusId = (props.id || props.name || label || "select-id")?.replaceAll(
    " ",
    ""
  );

  if (!Object.values(userAccounts).flat().length)
    return <OpenAccount btnMsg="Open Account" />;

  return (
    <Outer row={row} width={w} style={style}>
      <CusLabel htmlFor={cusId} ref={ref}>
        {label}
      </CusLabel>
      <CusSelect
        id={cusId}
        value={innerValue}
        onChange={(e) => {
          onChange(
            e,
            Object.values(userAccounts)
              .flat()
              .find((el) => el._id === e.target.value) || {}
          );
        }}
        {...props}
      >
        <option value="" disabled={disabledDefaultOption}>
          {optionsLabel}
        </option>
        {enviroment === "both"
          ? Object.keys(userAccounts).map((env, idx) => (
              <optgroup
                label={env}
                key={idx}
                style={{ textTransform: "capitalize" }}
              >
                {userAccounts[env].map((el) => (
                  <option
                    key={el.value}
                    value={el.value}
                    disabled={el.isDisabled}
                    style={{ textTransform: "initial" }}
                  >
                    {el.name}
                  </option>
                ))}
              </optgroup>
            ))
          : userAccounts[enviroment].map((el) => (
              <option key={el.value} value={el.value} disabled={el.isDisabled}>
                {el.name}
              </option>
            ))}
      </CusSelect>
    </Outer>
  );
};

export default SelectAccount;
