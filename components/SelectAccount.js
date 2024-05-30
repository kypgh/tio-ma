import React, { useCallback, useEffect, useState } from "react";
import {
  useGetUserLiveAccounts,
  useGetUserDemoAccounts,
} from "../utils/hooks/queryHooks";
import { SortDropDownSec } from "./Dropdown/dropdown.styles";

const mappedPlatforms = {
  mt4: "MT4",
  mt5: "MT5",
  ctrader: "cTrader",
};

/**
 * @component
 * @param {Object} props - The component props.
 * @param {'live' | 'demo' | 'both'} props.enviroment - The enviroment in which to display the content.
 * @param { React.CSSProperties } props.style
 * @param { React.CSSProperties } props.labelStyle
 * @param { String } props.label
 * @param { String } props.width
 * @param {String|Number} props.value
 * @param { (e, Object) => {} } props.onChange
 * @param { Boolean } props.disableZeroBalance
 * @param { Function } props.filter
 * @param { String } props.color
 * @param { String } props.mt
 * @param { String } props.mb
 * @param { String } props.defaultValue
 * @param { String } props.id
 * @param { String } props.name
 * @returns {JSX.Element} - The component.
 *
 */
const SelectAccount = ({
  enviroment = "both",
  onChange = () => {},
  label,
  value,
  style,
  width,
  disableZeroBalance = false,
  filter = useCallback(() => true, []),
  labelStyle,
  color,
  mt,
  mb,
  defaultValue,
  ...props
}) => {
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

  return (
    <>
      <SortDropDownSec
        style={style}
        widths={width}
        color={color}
        mt={mt}
        mb={mb}
      >
        <label
          style={labelStyle}
          htmlFor={props.id || props.name || "SelectAccount"}
        >
          {label}
        </label>
        <select
          id={props.id || props.name || "SelectAccount"}
          defaultValue={defaultValue}
          onChange={(e) =>
            onChange(
              e,
              [...userAccounts.live, ...userAccounts.demo].find(
                (el) => el.value == e.target.value
              )
            )
          }
          value={value}
          {...props}
        >
          <option value="">Please select</option>
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
                <option
                  key={el.value}
                  value={el.value}
                  disabled={el.isDisabled}
                >
                  {el.name}
                </option>
              ))}
        </select>
      </SortDropDownSec>
    </>
  );
};

export default SelectAccount;
