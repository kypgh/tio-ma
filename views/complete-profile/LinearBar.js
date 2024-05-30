import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";
import Loader from "../../components/Loader";
import { TiTickOutline } from "react-icons/ti";
import { device } from "../../styles/device";
import useWindowSize from "../../utils/hooks/useWindowSize";

const moveBg = keyframes`
0%{
    background-position: 0 -100vw 
  }
  100%{
    background-position: 0 100vw 
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  position: relative;
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 25px;
    width: fit-content;
  }
`;

const Bar = styled.div`
  width: ${({ completion }) => completion}%;
  min-width: ${({ minWidth }) => minWidth}%;
  height: 5px;
  background-color: ${theme.colors.secondaryColor};
  position: absolute;
  top: 25px;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  @media ${device.mobile} {
    top: 0;
    left: 0;
    transform: translateX(-15px);
    min-width: unset;
    height: ${({ completion }) => completion}%;
    min-height: ${({ minWidth }) => minWidth}%;
    width: 5px;
  }
`;

const MobileBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-16px);
  height: 100%;
  min-height: 100%;
  width: 7px;
  /* border: 1px solid ${theme.colors.primaryColor}; */
  border-radius: 5px;
  background: linear-gradient(
    45deg,
    ${theme.colors.lightGrayishBlue} 0%,
    ${theme.colors.slightGray} 13%,
    ${theme.colors.lightGrayishBlue} 25%,
    ${theme.colors.slightGray} 37%,
    ${theme.colors.lightGrayishBlue} 50%,
    ${theme.colors.slightGray} 63%,
    ${theme.colors.lightGrayishBlue} 75%,
    ${theme.colors.slightGray} 87%,
    ${theme.colors.lightGrayishBlue} 100%
  );
  animation: ${moveBg} 30s linear infinite;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  width: 100%;
  z-index: 2;
  position: relative;

  @media ${device.mobile} {
    flex-direction: row;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-100%, -50%);
      width: 9px;
      height: 2px;
      background-color: ${theme.colors.secondaryColor};
      z-index: -1;
    }
  }
`;

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.mainBlack};
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ isCompleted }) =>
    isCompleted ? theme.colors.secondaryColor : theme.colors.mainWhite};
  border: 1px solid ${theme.colors.secondaryColor};
  transition: all 0.3s ease-in-out;
  position: relative;

  svg {
    transition: all 0.3s ease-in-out;
    font-size: 25px;
    color: ${({ isCompleted }) =>
      isCompleted ? theme.colors.mainWhite : theme.colors.secondaryColor};
  }
`;

const SuccessIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.secondaryColor};
  border-radius: 50%;
  bottom: 0;
  right: 0;
  transform: translate(15%, 15%);
  background-color: ${theme.colors.mainWhite};
`;

const LinearBar = ({ steps = [], isLoading }) => {
  const { width } = useWindowSize();

  const completion = useMemo(
    () =>
      (steps.reduce((acc, curr) => (curr.isCompleted ? acc + 1 : acc), 0) /
        steps.length) *
      100,
    [steps]
  );
  const activeStep = useMemo(() => {
    let foundIdx = steps.findIndex((step) => !step.isCompleted);
    if (foundIdx === -1) foundIdx = steps.length - 1;
    return foundIdx;
  }, [steps]);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <BarContainer>
        <Bar completion={completion} minWidth={100 / steps.length / 2} />
        {width <= 475 && <MobileBar />}
        {steps.map((step, index) => (
          <Item key={index}>
            <IconCircle isCompleted={step.isCompleted}>
              {step.icon}
              {step.isCompleted && (
                <SuccessIcon>
                  <TiTickOutline
                    color={theme.colors.secondaryColor}
                    size={16}
                  />
                </SuccessIcon>
              )}
            </IconCircle>
            <Title>{step.title}</Title>
          </Item>
        ))}
      </BarContainer>
      {steps[activeStep].component}
    </Container>
  );
};

export default LinearBar;
