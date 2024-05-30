import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";

import useAnimation from "../utils/hooks/useAnimation";

const OpenAnimation = keyframes`
    from {
        scale: 1 0;
    }
    to {
        scale: 1 1;
    }
`;

const CloseAnimation = keyframes`
    from {  
        scale: 1 1;
        
    }
    to {
        scale: 1 0;
    }
`;

const Tooltip = styled.div`
  position: absolute;
  z-index: 10000;
  background: ${theme.colors.mainWhite};
  border: 1px solid ${theme.colors.mainBlack};
  /* box-shadow: ${theme.colors.mainWhite} 0px 0px 15px; */
  color: ${theme.colors.mainBlack};
  padding: 7px;
  border-radius: 10px;
  font-size: 14px;
  opacity: 0;
  max-width: 300px;
  width: max-content;
  transition: opacity 0.3s ease;
  pointer-events: none;
  animation: ${OpenAnimation} 0.15s ease-in-out;

  &.closing {
    animation: ${CloseAnimation} 0.15s ease-in-out forwards;
  }

  ${({ position }) => {
    switch (position) {
      case "top-left":
        return `
                transform: translate(-100%, -100%) translate(10px, -10px);
                border-bottom-right-radius: 0;
            `;
      case "top-right":
        return `
                transform: translate(0, -100%) translate(-10px, -10px);
                border-bottom-left-radius: 0;
            `;
      case "bottom-left":
        return `
                transform: translate(-100%, 0) translate(0px, 10px);
                border-top-right-radius: 0;
            `;
      case "bottom-right":
        return `
                transform: translate(0, 0) translate(0px, 10px);
                border-top-left-radius: 0;
            `;
      default:
        return `
                transform: translate(-100%, -100%) translate(10px, -10px);
                border-bottom-right-radius: 0;
            `;
    }
  }}

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: ${theme.colors.mainWhite};
    border-color: ${theme.colors.mainBlack};
    border-style: solid;
    border-width: 1px;
    box-shadow: ${theme.colors.mainWhite} 0px 0px 15px;
    pointer-events: none;
    z-index: -1;
    ${({ position }) => {
      switch (position) {
        case "top-left":
          return `
                    border-top: 0;
                    border-left: 0;
                    top: 100%;
                    left: 100%;
                    transform: translate(-100%, -50%) translate(-1px, 1px) rotate(45deg);
                `;
        case "top-right":
          return `
                    border-top: 0;
                    border-left: 0;
                    top: 100%;
                    left: 0px;
                    transform: translate(0, -50%) translate(1px, 1px) rotate(45deg);
                `;
        case "bottom-left":
          return `
                    border-bottom: 0;
                    border-right: 0;
                    top: 0;
                    left: 100%;
                    transform: translate(-100%, -50%) translate(-1px, -1px) rotate(45deg);
                `;
        case "bottom-right":
          return `
                    border-bottom: 0;
                    border-right: 0;
                    top: 0;
                    left: -1px;
                    transform: translate(0, -50%) translate(1px, -1px) rotate(45deg);
                `;
        default:
          return `
                    border-top: 0;
                    border-left: 0;
                    top: 100%;
                    left: 100%;
                    transform: translate(-100%, -50%) translate(-2px, 2px) rotate(45deg);
                `;
      }
    }}
  }
`;

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${Tooltip} {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  & span {
    font-weight: 700;
    font-size: 14px;
  }
`;

const TooltipWrapper = ({
  children,
  tooltip,
  position = "top-right",
  title,
}) => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  const [isMounted, setIsMounted] = useState(false);
  const isOpen = useAnimation(isMounted, 150);

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [customPosition, setCustomPosition] = useState(position);

  const ref = useRef(null);

  const handleMouseMove = (e) => {
    setXPos(e.nativeEvent.offsetX);
    setYPos(e.nativeEvent.offsetY);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      setScrollY(window.scrollY);
    }
  }, [isOpen]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCustomPosition(position);
      if (rect.right > screenWidth) {
        setCustomPosition(customPosition.split("-")[0] + "-left");
      }
      if (rect.left < 0) {
        setCustomPosition(customPosition.split("-")[0] + "-right");
      }
      if (rect.bottom > screenHeight) {
        setCustomPosition("top-" + customPosition.split("-")[1]);
      }
      if (rect.top < 0 + scrollY) {
        setCustomPosition("bottom-" + customPosition.split("-")[1]);
      }
    }
  }, [isOpen, xPos, yPos]);

  return (
    <>
      <TooltipContainer
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
          setIsMounted(true);
          // handleMouseMove(e);
        }}
        onMouseLeave={() => setIsMounted(false)}
      >
        {isOpen && (
          <Tooltip
            ref={ref}
            position={customPosition}
            xPos={xPos}
            yPos={yPos}
            style={{ top: yPos, left: xPos }}
            className={`${!isMounted && "closing"}`}
          >
            <Content>
              <span>{title}</span>
              {tooltip}
            </Content>
          </Tooltip>
        )}
        {children}
      </TooltipContainer>
    </>
  );
};

export default TooltipWrapper;
