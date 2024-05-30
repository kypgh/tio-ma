import styled from "styled-components";
import { device } from "../../../styles/device";

const TabContent = styled.div``;
const TabShortMenu = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  @media ${device.mobile} {
    display: block !important;
  }
`;

const LiveAccountMain = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 440px;

  label {
    margin-top: 5px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
  @media ${device.mobile} {
    min-height: 600px;
  }
`;
const LiveAccount = styled.div`
  max-width: 485px;
  @media ${device.mobile} {
    width: 100%;
  }
`;

const AccountTypeSec = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
  width: 50%;
  .dropdown-flex {
    display: inline-flex;
    flex-direction: column;
    @media ${device.mobile} {
      margin-bottom: 10px;
    }
  }

  label {
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
  select {
    width: 211px;
  }
  @media ${device.mobile} {
    margin-bottom: 0px;
    display: block;
    gap: 0px;
    width: 100%;
    select {
      width: 100%;
    }
  }
`;
const OpenLiveAccountText = styled.p`
  margin-bottom: 30px;
  display: flex;
  a {
    text-decoration: underline;
  }
  label {
    display: flex;
    align-items: flex-start;
  }
  .mychk-open {
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    border: 1px solid ${({ theme }) => theme.colors.silverLightGray};
    border-radius: 3px;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
`;
const LiveAccountBtn = styled.div`
  text-align: center;
  @media ${device.mobile} {
    text-align: left;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export {
  TabContent,
  TabShortMenu,
  LiveAccount,
  LiveAccountMain,
  AccountTypeSec,
  OpenLiveAccountText,
  LiveAccountBtn,
  Form,
};
