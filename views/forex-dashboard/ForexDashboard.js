import React from "react";
import styled from "styled-components";
import "../../public/scripts/iframeResizer.min.js";

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    width: 0px;
  }
`;

const ForexDashboard = () => {
  return (
    <Iframe
      src="https://tiomarkets.com/includes/iframes/dashboard"
      onLoad={() => {
        iFrameResize();
      }}
    />
  );
};

export default ForexDashboard;
