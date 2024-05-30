import styled from "styled-components";
const UserMenu = styled.div`
  background: ${({ theme }) => theme.colors.mainBlack};
  border: none;
  right: 0;
  top: 61px;
  margin: 0;
  padding: 25px 25px;
  position: absolute;
  z-index: 999;
  min-width: 265px;
  border-radius: 0px 0px 5px 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
`;
const UserPhotos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 -25px;
  padding: 0 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiaryDarkGray};
`;
const EMailLabel = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.mainWhite};
  opacity: 0.8;
  padding-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const CopyBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SettingsSec = styled.div`
  padding: 10px 25px;
  margin: 0 -25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiaryDarkGray};
  & a {
    color: ${({ theme }) => theme.colors.mainWhite};
    line-height: 15px;
    padding: 5px 0;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }
`;
const StyledSettings = styled.div`
  margin-bottom: 20px;
`;
const SwapLevel = styled.div`
  display: flex;
`;
const SwapStatus = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  vertical-align: middle;

  & label {
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    color: ${({ theme }) => theme.colors.secondaryDarkGray};
  }
`;
const LogOutSec = styled.div`
  padding-top: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.mainWhite};
`;
export {
  UserMenu,
  UserPhotos,
  EMailLabel,
  SettingsSec,
  StyledSettings,
  SwapLevel,
  SwapStatus,
  LogOutSec,
  CopyBtn,
};
