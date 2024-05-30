import styled from "styled-components";
import { device } from "../../../styles/device";

const TabContent = styled.div``;

const WireTransMain = styled.div``;

const TabContainerInner = styled.div``;

const TabHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  @media ${device.mobile} {
    display: block;
  }
`;
const Tab = styled.div`
  margin-right: 20px;
  :last-child {
    margin-right: 0px;
  }
  @media ${device.mobile} {
    margin-right: 0px;
    margin-bottom: 10px;
  }
`;
const TabBodyDeposits = styled.div``;
const TabButton = styled.div`
  padding: 4px 27px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
  color: ${({ theme }) => theme.colors.secondaryColor};
  border-radius: 3px;
  &.tabs-active {
    color: ${({ theme }) => theme.colors.mainWhite};
    border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
    background: ${({ theme }) => theme.colors.secondaryColor};
  }
  @media ${device.mobile} {
    text-align: center;
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
  WireTransMain,
  TabContainerInner,
  TabHead,
  Tab,
  TabBodyDeposits,
  TabButton,
  AssistanceText,
  CopyrightText,
};
