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
const TitleH3 = styled.h3`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  margin-bottom: 0px;
`;

const DescText = styled.p`
  margin-top: 5px;
  margin-bottom: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.lightGray};
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
    flex-wrap: wrap;
    border-bottom: 0;
    gap: 5px;
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

  @media ${device.mobile} {
    padding: 5px;
  }
`;

const TabContent = styled.div``;
const TabShortMenu = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  @media ${device.mobile} {
    display: block !important;
  }
`;

export {
  LiveAccountMain,
  TitleH3,
  DescText,
  TabContainer,
  TabHead,
  Tab,
  TabBody,
  TabButton,
  TabContent,
  TabShortMenu,
};
