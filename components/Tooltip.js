import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";
import useAnimation from "../utils/hooks/useAnimation";

const positionCfonfig = {
  top: (offset, parent) =>
    `translate(-0%, -100%) translate(-50%, ${-parent.height / 2 - offset}px)`,
  bottom: (offset, parent) =>
    `translate(-0%, 0%) translate(-50%, ${parent.height / 2 + offset}px)`,
  left: (offset, parent) =>
    `translate(-100%, -0%) translate(${-parent.width / 2 - offset}px, -50%)`,
  right: (offset, parent) =>
    `translate(0%, -0%) translate(${parent.width / 2 + offset}px, -50%)`,
};

const entranceAnimation = (offset, parent, position) => keyframes`
  from {
    transform: translate3d(0,10px,0) ${positionCfonfig[position](
      offset,
      parent
    )};
    opacity: 0;
  }
  to {
    transform: translate3d(0,0,0) ${positionCfonfig[position](offset, parent)};
    opacity: 1;
  }
`;

const Outer = styled.div``;

const TooltipContainer = styled.div`
  position: fixed;
  z-index: 10000;
  top: ${({ pos }) => pos.y + pos.height / 2}px;
  left: ${({ pos }) => pos.x + pos.width / 2}px;
  max-width: ${({ width }) => width}px;
  width: max-content;
  padding: 5px;
  border-radius: 7px;
  border: 1px solid ${theme.colors.sixLightGray};
  background-color: ${theme.colors.slightGray};
  font-size: 12px;
  font-weight: 800;
  transform: ${({ offset, parent, position }) =>
    positionCfonfig[position](offset, parent)};
  animation: ${({ offset, parent, position }) =>
      entranceAnimation(offset, parent, position)}
    0.15s ease-in-out forwards;
`;

const Tooltip = ({
  children,
  offset = 5,
  position = "top",
  tooltip,
  width = 300,
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);

  return (
    <Outer
      ref={ref}
      onMouseEnter={(e) => {
        setIsMounted(true);
        setPos(() => {
          const parentRect = ref.current.getBoundingClientRect();
          return {
            x: parentRect.x,
            y: parentRect.y,
            width: parentRect.width,
            height: parentRect.height,
          };
        });
      }}
      onMouseLeave={() => setIsMounted(false)}
    >
      {isMounted && (
        <TooltipContainer
          pos={pos}
          offset={offset}
          parent={ref.current.getBoundingClientRect()}
          position={position}
          width={width}
        >
          {tooltip}
        </TooltipContainer>
      )}
      {children}
    </Outer>
  );
};

export default Tooltip;
