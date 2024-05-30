import styled from "styled-components";
import { device } from "../../../styles/device";

const TabContent = styled.div``;
const LiveAccountMain = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 405px;
  @media ${device.mobile} {
    display: block;
  }
`;

const TabContainerInner = styled.div``;

const TabHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.mobile} {
    display: block;
  }
`;
const Tab = styled.div`
  @media ${device.mobile} {
    width: 100%;
  }
`;
const TabBodyDeposits = styled.div`
  box-sizing: border-box;
  width: 590px;
  min-height: 317px;
  //filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryWhite};
  padding: 19px 29px;
  margin-bottom: 10px;
  @media ${device.tablet} {
    width: 100%;
    min-height: auto;
  }
`;
const TabButton = styled.div`
  padding: 10px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-bottom: 3px solid transparent;
  color: rgba(0, 0, 0, 0.2);
  svg {
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  &.tabs-active {
    color: rgba(0, 0, 0, 1);
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryColor};
  }
`;
const AssistanceText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
`;
const CopyrightText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
`;
export {
  TabContent,
  LiveAccountMain,
  TabContainerInner,
  TabHead,
  Tab,
  TabBodyDeposits,
  TabButton,
  AssistanceText,
  CopyrightText,
};
