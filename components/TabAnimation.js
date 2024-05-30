import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const AnimationDiv = styled.div`
  animation: ${slideIn} 0.3s ease forwards;
`;

const OverflowDiv = styled.div`
  overflow: hidden;
`;

/**
 * @param {{style: React.CSSProperties, isMounted: Boolean }} param0
 * @returns {React.Component}
 *
 * This is used with the table component!
 */
const TabAnimation = ({ children, isMounted, style }) => {
  if (isMounted)
    return (
      <OverflowDiv style={style}>
        <AnimationDiv>{children}</AnimationDiv>
      </OverflowDiv>
    );
  return null;
};

export default TabAnimation;
