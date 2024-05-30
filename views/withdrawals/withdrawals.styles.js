import styled from "styled-components";
import { device } from "../../styles/device";

const LiveAccountMain = styled.div`
  margin-top: 50px;
  min-height: 450px;
  @media ${device.tablet} {
    min-height: 360px;
  }
  @media ${device.mobile} {
    min-height: 350px;
  }
`;

const TabContainer = styled.div``;
const TabHead = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiaryLightGray};
  margin: 0 -25px;
  padding: 0 25px;
  @media ${device.mobile} {
    margin: 0;
    padding: 0;
  }
`;
const Tab = styled.div``;
const TabBody = styled.div`
  padding: 25px 0;
`;
const TabButton = styled.div`
  padding: 10px;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-bottom: 3px solid transparent;

  color: rgba(0, 0, 0, 0.5);
  &.tabs-active {
    color: rgba(0, 0, 0, 1);
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryColor};
  }
`;
export { LiveAccountMain, TabContainer, TabHead, Tab, TabBody, TabButton };
