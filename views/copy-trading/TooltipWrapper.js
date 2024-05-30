import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { 
    scale: 0;
  }
  to {
    scale: 1;
  }
`;

const ChildrenContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const Fixed = styled.div`
  position: fixed;
  background-color: #f4f4f4;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 5px;
  animation: ${fadeIn} 0.1s ease-in-out;
  z-index: 1000000;
  max-width: 220px;
  text-align: center;
  transform: translate(-50%, -100%);

  & > p {
    font-size: 14px;
    font-weight: 600;
  }
`;

const TooltipWrapper = ({ children, tooltip = "" }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [show, setShow] = useState(false);

  return (
    <ChildrenContainer
      onMouseEnter={(e) => {
        setShow(true);
        setX(e.clientX);
        setY(e.clientY);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      {children}
      {show && (
        <Fixed
          style={{
            left: x,
            top: y,
          }}
        >
          <p>{tooltip}</p>
        </Fixed>
      )}
    </ChildrenContainer>
  );
};

export default TooltipWrapper;
