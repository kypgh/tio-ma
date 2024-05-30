import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";
import { BsInfoCircleFill } from "react-icons/bs";
import { device } from "../styles/device";
import Tooltip from "./TooltipThemis";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-right: 30px;
  background-color: ${theme.colors.mainWhite};
  border: 1px solid ${theme.colors.mainBlack}2b;
  color: ${theme.colors.mainBlack};
  position: relative;
  width: 100%;
  border-radius: 5px;
  box-shadow: 5px 5px 14px #f0f0f0, -5px -5px 14px #ffffff;

  @media ${device.tablet} {
    max-width: calc(50% - 7.5px);
    padding-right: 15px;
  }
`;

const Stat = styled.div`
  font-weight: 700;
  font-size: 18px;
  animation: ${({ isLoading }) => (isLoading ? shimmer : "none")} 3s infinite;
  background: linear-gradient(
    ${({ isLoading }) =>
      isLoading ? "to right, #e6e6e6 25%, #cccccc 50%, #e6e6e6 70%" : ""}
  );
  border-radius: 3px;
  background-size: 1000px 100%;

  &::before {
    content: ".";
    opacity: 0;
    color: transparent;
    user-select: none;
    pointer-events: none;
  }
`;

const Label = styled.div`
  font-size: 12px;
  display: flex;
  width: 100%;
  margin-top: 5px;

  animation: ${({ isLoading }) => (isLoading ? shimmer : "none")} 3s infinite;
  background: linear-gradient(
    ${({ isLoading }) =>
      isLoading ? "to right, #e6e6e6 25%, #cccccc 50%, #e6e6e6 70%" : ""}
  );
  border-radius: 3px;
  background-size: 1000px 100%;

  &::before {
    content: ".";
    opacity: 0;
    color: transparent;
    user-select: none;
    pointer-events: none;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const StatsBox = ({ stat, label, info = "" }) => {
  return (
    <Outer>
      <Stat isLoading={!stat || !label}>{stat}</Stat>
      <Label isLoading={!label || !stat}>{stat && label}</Label>
      <Info>
        <Tooltip position="top" content={info}>
          <BsInfoCircleFill size={15} />
        </Tooltip>
      </Info>
    </Outer>
  );
};

export default StatsBox;
