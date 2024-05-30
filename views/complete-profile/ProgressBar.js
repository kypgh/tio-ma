import React from "react";
import styled from "styled-components";
import BarStep from "./BarStep";
import { IconType } from "react-icons";

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 15px;
  width: 100%;
  margin-bottom: 25px;
`;
/**
 *
 * @param {{activeScreen: Number, setActiveScreen: Function, steps:[{label:"", Icon:IconType, completion: Number }]}} param0
 * @returns
 */
const ProgressBar = ({ activeScreen, setActiveScreen, steps = [] }) => {
  return (
    <BarContainer>
      {steps.map((step, idx) => (
        <BarStep
          label={step.label}
          Icon={step.Icon}
          key={step.label}
          isActive={activeScreen === idx + 1}
          onClick={() => setActiveScreen(idx + 1)}
          completion={step.completion}
        />
      ))}
    </BarContainer>
  );
};

export default ProgressBar;
