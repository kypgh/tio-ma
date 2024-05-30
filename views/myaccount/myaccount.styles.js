import Image from "next/image";
import styled from "styled-components";
import { device } from "../../styles/device";
import { theme } from "../../styles/theme";

const AccountMain = styled.div`
  display: flex;
  /* align-items: center; */
  @media ${device.mobile} {
    display: block !important;
  }
`;
const AccountsTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondaryDarkGray};
  margin: 0px;
  display: inline-block;
  vertical-align: middle;
`;
const OpenLiveAccount = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  @media ${device.mobile} {
    margin-top: 10px;
  }
`;

const ButtonLink = styled.div`
  margin-left: auto;
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  border: 1px solid ${({ theme }) => theme.colors.secondaryLightGray};
  border-radius: 3px;
  align-items: center;
  display: flex;
  &:hover {
    img {
      filter: brightness(0) invert(1);
    }
    color: ${({ theme }) => theme.colors.mainWhite};
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
  }
  @media ${device.mobile} {
    margin-left: 0;
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
const TabBody = styled.div``;
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
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
`;

const TabContent = styled.div``;
const TabShortMenu = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  justify-content: space-between;
  @media ${device.mobile} {
    display: block !important;
  }
`;

const ControlGroup = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;

  .btn-grid-view {
    padding: 5px;
    width: 33.69px;
    height: 33.03px;
    border: transparent;
    background-color: ${({ theme }) => theme.colors.mainWhite};
    background: transparent;
  }
  .btn-grid-view:hover {
    background-color: ${({ theme }) => theme.colors.fourLightGray};
  }
  .grid-active {
    background-color: ${({ theme }) => theme.colors.fourLightGray};
  }
`;
const LiveAccountMain = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 405px;

  @media ${device.tablet} {
    min-height: 320px;
  }
  @media ${device.mobile} {
    min-height: 250px;
  }
`;
const ListGridMain = styled.div`
  border: 1px solid rgba(190, 190, 190, 1);
  display: flex;
  border-radius: 3px;
  width: fit-content;

  img {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ListGridItem = styled.div.attrs((props) => ({
  "data-active": props["data-active"],
}))`
  padding: 5px;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.fourLightGray};
  }

  &[data-active="true"] {
    background-color: ${theme.colors.fourLightGray};
  }
`;

const TCa = styled.p`
  color: ${({ theme }) => theme.colors.primaryColor};
  font-weight: 600;
  margin: 0px;
`;
const TCp = styled.p`
  color: ${({ theme }) => theme.colors.mainBlack};
  font-weight: 700;
  margin: 0px;
`;

const TCi = styled.div`
  height: 40px;
  width: 40px;
  overflow: hidden;
  img {
    border-radius: 50%;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const TCpGrid = styled.p`
  color: ${({ theme }) => theme.colors.mainBlack};
  font-weight: 500;
  margin: 0px;
`;

const TCt = styled.p`
  color: ${({ colors }) => colors};
  font-weight: ${({ fweight }) => (fweight ? fweight : "700")};
  margin: 0px;
  width: ${({ width }) => width};
`;

const TCd = styled.button`
  color: ${({ colors }) => colors};
  background-color: ${({ bgcolors }) => bgcolors};
  border-radius: 5px;
  /* padding: 5px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  gap: 10px;
  border: 1px solid ${({ colors }) => colors};
  width: 90px;
  height: 22px;
`;
const TCaction = styled.div`
  @media ${device.tablet} {
    .pr-10 {
      padding-right: 0px;
    }
  }
`;

const TransactionTxt = styled.p`
  font-weight: 400;
  font-size: 10px;
  margin: 20px 0px;
  line-height: 12px;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.secondaryBlack};
`;

const TcBtn = styled.div`
  display: flex;
  & button {
    transition: all 0.15s linear;
    padding: 8px;
    border: 2px solid transparent;
    background-color: #0064fa;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;

    :hover {
      background-color: transparent;
      border: 2px solid #0064fa;
      color: #0064fa;
    }
  }
`;

export {
  AccountMain,
  AccountsTitle,
  OpenLiveAccount,
  ButtonLink,
  TabContainer,
  TabHead,
  Tab,
  TabButton,
  TabBody,
  TabContent,
  ControlGroup,
  ListGridItem,
  LiveAccountMain,
  TabShortMenu,
  ListGridMain,
  TCa,
  TCp,
  TCpGrid,
  TCt,
  TCd,
  TCi,
  TcBtn,
  TransactionTxt,
  TCaction,
};
