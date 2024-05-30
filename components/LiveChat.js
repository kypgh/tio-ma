import React from "react";
import { Lottie } from "./Lottie";
import ChatAnimation from "../public/assets/animations/chat.json";
import styled from "styled-components";
const LiveChatWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  transform-origin: center center;
  transform: rotateY(180deg);
  transition: all 0.15s linear;
  cursor: pointer;
  :hover {
    transform: rotateY(180deg) scale(1.1);
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.4));
  }
`;

const LiveChat = () => {
  return (
    <LiveChatWrapper>
      <Lottie
        mBottom={0}
        animationData={ChatAnimation}
        autoPlay
        loop
        width={65}
        height={65}
      />
    </LiveChatWrapper>
  );
};

export default LiveChat;
