import { device } from "@/styles/device";
import { theme } from "@/styles/theme";
import { BsFillChatDotsFill } from "react-icons/bs";
import styled from "styled-components";

const Outer = styled.div`
  position: fixed;
  bottom: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  transition: 0.15s all ease;

  background-color: #111111;
  padding: 5px;
  width: 120px;
  box-shadow: -5px 5px 0px 0px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
  color: #ffffff;
  font-weight: 600;

  @media (min-width: 992px) {
    &:hover {
      color: ${theme.colors.primaryColor};
      transform: translate(-3px, 3px);
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
      background-color: #111111;
      border: none;
    }
  }
  @media ${device.tablet} {
    position: unset;
    padding: 10px 15px;
    font-size: 12px;
    line-height: 15px;
    left: 0;

    background-color: inherit;
    box-shadow: none;
    border: none;
    color: inherit;
    font-weight: inherit;
    width: 100%;
    justify-content: flex-start;
    border-radius: 5px;

    & > svg {
      color: #3d3d3d;
    }

    &:hover {
      background-color: #fff;
      & > svg {
        color: ${theme.colors.primaryColor};
      }
    }
  }
`;

const LiveChatWrapper = () => {
  const onClick = () => {
    document.getElementById("wo_online_image").click();
    document.getElementById("wo_offline_image").click();
  };

  return (
    <Outer onClick={onClick}>
      <BsFillChatDotsFill />
      <p>Live Chat</p>
    </Outer>
  );
};

export default LiveChatWrapper;
