import React from "react";
import styled from "styled-components";
import { device } from "../styles/device";
import Loader from "./Loader";

const OuterContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;

  @media ${device.mobile} {
    max-width: 320px;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200%;
  transform: translateX(${({ activeStep }) => (activeStep === 1 ? 0 : "-50%")});
  transition: 0.3s all ease;
`;

const Item = styled.div`
  width: 100%;
`;

const TwoStepForm = ({
  firstStep,
  secondStep,
  activeStep = 1,
  isLoading = false,
}) => {
  return (
    <OuterContainer>
      <Loader isLoading={isLoading} />
      <Inner activeStep={activeStep}>
        <Item>{firstStep}</Item>
        <Item>{secondStep}</Item>
      </Inner>
    </OuterContainer>
  );
};

export default TwoStepForm;
