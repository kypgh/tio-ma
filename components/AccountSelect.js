import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  useGetUserDemoAccounts,
  useGetUserLiveAccounts,
} from "../utils/hooks/queryHooks";
import { useRouter } from "next/router";

const SelectOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: ${({ $width }) => $width || "100%"};
  width: 100%;
`;

const Label = styled.label`
  color: #111111;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 7px 10px;
  font-size: 13px;
  font-weight: 500;
  color: #111111;
  background-color: #ffffff;
  outline: none;

  &:focus {
    border: 1px solid #1890ff;
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
 * @property { String } label - default: "Account ID"
 * @property { String } optionsLabel - default: "Please select"
 * @property { String } width
 * @property { String } id
 * @property { String } value
 * @property { (e, Object) => {} } onChange
 * @property { Boolean } disableZeroBalance
 * @property { Function } filter
 * @tutorial Returns OpenAccount component if there are no accounts.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement> & SelectAccountPropsTemp} param0
 */
const AccountSelect = ({
  width,
  enviroment = "both",
  filter = useCallback(() => true, []),
  value,
  onChange = () => {},
  disableZeroBalance = false,
  label = "Account ID",
  optionsLabel = "Please select",
  id = "account",
}) => {
  const liveEnabled = ["live", "both"].includes(enviroment);
  const { data: liveAccounts } = useGetUserLiveAccounts({
    enabled: liveEnabled,
  });
  const demoEnabled = ["demo", "both"].includes(enviroment);
  const { data: demoAccounts } = useGetUserDemoAccounts({
    enabled: demoEnabled,
  });
  const [filteredAccounts, setFilteredAccounts] = useState({});

  useEffect(() => {
    let filtAccs = {};
    switch (enviroment) {
      case "live":
        filtAccs.live = liveAccounts?.filter(filter);
        break;
      case "demo":
        filtAccs.demo = demoAccounts?.filter(filter);
        break;
      case "both":
        filtAccs.live = liveAccounts?.filter(filter);
        filtAccs.demo = demoAccounts?.filter(filter);
        break;
      default:
        break;
    }
    setFilteredAccounts(filtAccs);
    if (!value) return;
    const account = Object.values(filtAccs)
      .flat()
      .find((el) => el?._id === value);
    if (!account) {
      onChange({ _id: "" });
    }
  }, [liveAccounts, demoAccounts, enviroment, filter]);

  return (
    <SelectOuter $width={width}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        name={id}
        id={id}
        value={value}
        onChange={(e) => {
          const selectedAccount = Object.values(filteredAccounts)
            .flat()
            .find((el) => el._id === e.target.value);
          onChange(selectedAccount ?? { _id: "" });
        }}
      >
        <option value="">{optionsLabel}</option>
        {Object.keys(filteredAccounts)?.map((key) => (
          <optgroup key={key} label={key.toUpperCase()}>
            {filteredAccounts[key]?.map((el) => (
              <option
                key={el._id}
                value={el._id}
                disabled={disableZeroBalance && el.balance == 0}
              >
                {`${mappedPlatforms[el.platform]} - ${el.login_id} (${
                  el.currency
                } - ${el.balance})`}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </SelectOuter>
  );
};

export default AccountSelect;
