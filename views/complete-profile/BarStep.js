import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";
import Image from "next/image";
import { TiTickOutline } from "react-icons/ti";

const WavePath =
  "polygon( 100% 0%, 0% 0%, 0% 100%, 2% 99.84%, 4% 99.38%, 6% 98.64%, 8% 97.68%, 10% 96.55%, 12% 95.31%, 14% 94.06%, 16% 92.87%, 18% 91.81%, 20% 90.95%, 22% 90.35%, 24% 90.04%, 26% 90.04%, 28% 90.35%, 30% 90.95%, 32% 91.81%, 34% 92.87%, 36% 94.06%, 38% 95.31%, 40% 96.55%, 42% 97.68%, 44% 98.64%, 46% 99.38%, 48% 99.84%, 50% 100%, 52% 99.84%, 54% 99.38%, 56% 98.64%, 58% 97.68%, 60% 96.55%, 62% 95.31%, 64% 94.06%, 66% 92.87%, 68% 91.81%, 70% 90.95%, 72% 90.35%, 74% 90.04%, 76% 90.04%, 78% 90.35%, 80% 90.95%, 82% 91.81%, 84% 92.87%, 86% 94.06%, 88% 95.31%, 90% 96.55%, 92% 97.68%, 94% 98.64%, 96% 99.38%, 98% 99.84%, 100% 100%)";

const waveAnimation = keyframes`
    0% {
    transform: translateX(0);
  }
    100% {
    transform: translateX(-50%);
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 220px;
  flex: 1;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: 0.3s all ease;
  cursor: pointer;
  padding: 15px 0;

  &:hover {
    border: 1px solid ${theme.colors.lightGray};
    background-color: ${theme.colors.slightGray};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 50%;
  min-width: 75px;
  min-height: 75px;
  background-color: ${theme.colors.secondaryColor};
  border: 1px solid ${theme.colors.secondaryColor};
  position: relative;
  overflow: hidden;
`;

const CusLabel = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${theme.colors.mainBlack};
`;

const ActiveLine = styled.div`
  width: 40px;
  height: 3px;
  background-color: ${({ isActive }) => isActive && theme.colors.primaryColor};
  transition: 0.3s all ease;
`;

const TickContainer = styled.div`
  position: relative;
`;

const ItemIcon = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: black;
  box-shadow: 0px 10px 21px -10px rgba(0, 0, 0, 0.25);
  border: 1px solid rgb(23, 121, 255);
  overflow: hidden;
  &::before {
    content: " ";
    display: inline-block;
    position: relative;
    top: ${({ completion }) => `-${completion}%`};
    width: 200%;
    height: 100%;
    background-color: white;
    clip-path: ${WavePath};
    animation: 4s infinite linear ${waveAnimation};
    transition: top 0.4s cubic-bezier(0.85, 0.13, 0.23, 0.92);
  }

  &::after {
    content: " ";
    display: inline-block;
    width: 200%;
    height: 200%;
    position: relative;
    top: -250%;
    background-color: rgb(23, 121, 255);
    mix-blend-mode: screen;
  }
`;

const Content = styled.div`
  position: relative;
  top: -50%;
  transform: translateY(-50%);
  height: 100%;
  color: white;
  mix-blend-mode: difference;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BarStep = ({ label, isActive, onClick, Icon, completion }) => {
  return (
    <StepContainer onClick={onClick}>
      <TickContainer>
        <ItemIcon completion={completion}>
          <Content>{Icon}</Content>
        </ItemIcon>
        {completion >= 100 && (
          <TiTickOutline
            size={30}
            color={theme.colors.primaryColor}
            style={{
              position: "absolute",
              zIndex: 2,
              bottom: "-3px",
              right: "-3px",
            }}
          />
        )}
      </TickContainer>
      <CusLabel>{label}</CusLabel>
      <ActiveLine isActive={isActive} />
    </StepContainer>
  );
};

export default BarStep;
