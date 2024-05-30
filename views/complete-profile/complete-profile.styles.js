import styled from "styled-components";
import { device } from "../../styles/device";
import theme from "../../styles/theme";

const LiveAccountMain = styled.div`
  align-items: center;
  text-align: center;
  & .btn-cpro {
    padding: 10px 95px;
    margin-bottom: 20px;
  }
  @media ${device.tablet} {
    display: block;
  }
`;

const Tab = styled.div`
  width: 30%;
  margin-right: 6.25rem;
  &:last-child {
    margin-right: 0rem;
  }
  @media ${device.tablet} {
    margin-right: 3.25rem;
  }
  @media ${device.tablet} {
    margin-right: 1.75rem;
  }
  @media ${device.mobile} {
    width: 100%;
    margin-right: 0rem;
  }
`;
const TabBody = styled.div``;
const TabButton = styled.div`
  transition: 0.7s;
  font-style: normal;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.slightGray};
  color: ${({ theme }) => theme.colors.slightGrayOne};

  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.12);

  @media ${device.mobile} {
    margin-bottom: 15px;
  }

  &.tabs-active {
    border: 1px solid ${({ theme }) => theme.colors.secondaryBlack};
    border-radius: 5px;
    box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.12);
    color: ${({ theme }) => theme.colors.mainBlack};
  }
`;

const TabContent = styled.div``;
const TabContainer = styled.div``;
const TabHead = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  flex-direction: row;
  margin-bottom: 40px;
  margin-top: 40px;

  @media ${device.mobile} {
    display: block;
  }
`;

const TabHeadTxt = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 27px 17px;

  @media ${device.tablet} {
    padding: 17px 7px;
    font-size: 11px;
  }
  @media ${device.mobile} {
    font-size: 16px;
    padding: 11px 7px;
  }
`;

const MultiStepProfile = styled.div`
  z-index: 0;
  border: none;
  position: relative;
  .msform {
    text-align: center;
    position: relative;
    margin-top: 20px;
  }

  #progressbar {
    margin-top: 46px;
    padding-bottom: 20px;
    margin-bottom: 0px;
    overflow: hidden;
    padding-left: 0px;
    position: relative;
    text-align: center;
  }

  #progressbar li {
    list-style-type: none;
    font-size: 12px;
    width: 25%;
    float: left;
    position: relative;
    text-align: center;
  }
  #progressbar li .complete-step-tick {
    position: absolute;
    top: 45px;
    right: 33%;
    @media ${device.tablet} {
      right: 31%;
    }
    @media ${device.mobile} {
      right: 25%;
    }
    @media ${device.mobile} {
      right: 19%;
    }
    @media ${device.mobile} {
      right: 10%;
    }
    @media ${device.mobile} {
      right: 3%;
    }
  }

  #progressbar li:before {
    width: 74px;
    height: 74px;
    display: block;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.mainWhite};
    background: ${({ theme }) => theme.colors.sevenLightGray};
    border-radius: 50%;
    margin: 0 auto 5px auto;
    line-height: 45px;
  }

  #progressbar li span {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
    display: block;
    margin-bottom: 5px;
  }
  #progressbar li strong {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: ${({ theme }) => theme.colors.secondaryBlack};
    padding-bottom: 10px;
    @media ${device.mobile} {
      font-size: 14px;
      line-height: 16px;
    }
  }
  #progressbar li.active-b {
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryColor};
  }
  #progressbar .active-b:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -20px;
    width: 47px;
    right: 0;
    margin: 0 auto;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primaryColor};
    @media ${device.mobile} {
      bottom: -20px;
    }
    @media ${device.mobile} {
      bottom: -36px;
    }
  }
`;

const Progress = styled.div`
  display: flex;
  height: 6px;
  width: 81%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.mainWhite};
  position: absolute;
  left: 0%;
  right: 0px;
  top: 37px;
  margin: 0 auto;
`;
const ProgressBar = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const Codecontainer = styled.div`
  margin-top: 0px;
  margin-bottom: 54px;
`;
const EmailVerifySec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  row-gap: ${({ rgaps }) => rgaps}px;

  svg,
  .ic-tick-right {
    position: absolute;
    right: 10px;
    top: 12px;
    color: ${({ theme }) => theme.colors.secondaryColor};
    @media ${device.mobile} {
      right: 2px;
      top: 25px;
    }
  }

  @media ${device.tablet} {
    row-gap: ${({ rgaps }) => (rgaps > 0 ? 229 : rgaps)}px;
    svg {
      right: 25px;
    }
  }

  @media ${device.mobile} {
    row-gap: ${({ rgaps }) => (rgaps > 0 ? 229 : rgaps)}px;
    svg {
      right: 25px;
      top: 25px;
    }
  }
  @media ${device.mobile} {
    svg {
      right: 25px;
      top: 25px;
    }
  }
`;
const Input2 = styled.input`
  width: ${({ iwidth }) => (iwidth ? iwidth : 462)}px;
  background: ${({ theme }) => theme.colors.mainWhite};
  border: 1px solid ${({ theme }) => theme.colors.slightGray};
  border-radius: 5px;
  padding: 14px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  &:focus {
    outline: none;
  }
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
  }
  @media ${device.tablet} {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 100%;
  }
  @media ${device.mobile} {
    width: 100%;
    margin: 15px 0;
  }
`;
const EmailVerifyMain = styled.div``;

const ImagTag = styled.div`
  margin-bottom: ${({ pmb }) => (pmb ? pmb : "")};

  @media ${device.mobile} {
    margin-bottom: 70px;
  }
`;
const Phoneverifycontainer = styled.div`
  text-align: center;
`;
const PhoneInputController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ mb }) => mb}px;

  svg,
  .ic-tick-phone {
    position: absolute;
    right: 10px;
    top: 12px;
    color: ${({ theme }) => theme.colors.secondaryColor};
    bottom: 0;
  }
  .country-code-tel {
    background: ${({ theme }) => theme.colors.mainWhite};
    border: 1px solid ${({ theme }) => theme.colors.slightGray};
    border-radius: 5px;
    padding: 14px;
    text-align: center;
    width: 123px;
    &:focus {
      outline: none;
    }
    &:focus-within {
      border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
    }
  }
  label {
    display: block;
    margin: 0 10px;
    text-align: center;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
  .phone-number-tel {
    width: 246px;
    &:focus {
      outline: none;
    }
    &:focus-within {
      border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
    }
  }
  .PhoneInputInput {
    background: transparent;
    border: 0;
    &:focus {
      outline: none;
    }
    &:focus-within {
      border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
    }
  }
  .PhoneInputInput:focus-visible {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
  }
  @media ${device.mobile} {
    display: block;
    margin-bottom: 70px;
    label {
      display: block;
      margin: 10px 0px;
    }
    .country-code-tel {
      width: 100%;
    }
    .phone-number-tel {
      width: 100%;
      margin: 0px;
    }
  }
`;
const PInformationMain = styled.div`
  label {
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }

  @media ${device.mobile} {
    margin-top: 10px;
  }
`;

const Personalinfocontainer = styled.div`
  text-align: center;
`;

const Finputc = styled.div`
  flex-direction: column;
  display: inline-flex;
  @media ${device.tablet} {
    margin-bottom: 0px;
    width: 100%;
  }

  @media ${device.mobile} {
    margin-bottom: 10px;
    width: 100%;
  }
`;

const Dinputc = styled.div`
  text-align: left;
  margin-top: ${({ mt }) => (mt ? mt : "24px")};
  margin-bottom: ${({ imb }) => (imb ? imb : "30px")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  &.mb-80 {
    margin-bottom: 80px;
  }
  .dropdown-flex {
    display: inline-flex;
    flex-direction: column;
    @media ${device.mobile} {
      margin-bottom: 10px;
      margin-right: 10px;
      :last-child {
        margin-right: 0px;
      }
    }
  }

  label {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }

  @media ${device.mobile} {
    margin-top: 0;
    margin-bottom: 0px;
    display: block;
    gap: 0px;
    width: 100%;

    &.mb-80 {
      margin-bottom: 40px;
    }
  }
`;

const FormCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputMain = styled.div`
  position: relative;
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.mobile} {
    width: 100%;
  }
`;
const FinancialInfo = styled.section`
  padding: 25px;
  @media ${device.mobile} {
    padding: 0px;
  }
`;

const RadioBox = styled.div`
  text-align: left;
  margin-top: ${({ mt }) => (mt ? mt : "24px")};
  margin-bottom: ${({ imb }) => (imb ? imb : "30px")};
  color: ${({ theme }) => theme.colors.secondaryBlack};
  width: ${({ widths }) => (widths ? widths : "100%")};
  display: inline-flex;
  flex-direction: column;
  label {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  @media ${device.mobile} {
    width: 100%;
  }
`;
const RadioButton = styled.div`
  text-align: left;
  display: flex;
  gap: 26px;
  width: 100%;
  @media ${device.mobile} {
    gap: 0px;
    width: 100%;
    max-width: 100%;
    display: block;
  }
`;
const FinancialMain = styled.div`
  align-items: center;
  @media ${device.mobile} {
    display: block !important;
  }
`;
const BackMain = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  @media ${device.mobile} {
    margin-top: 0px;
  }
`;
const ApprovedStatus = styled.div`
  display: flex;
  position: absolute;
  right: -100px;
  top: 50%;
  align-items: center;
  @media ${device.tablet} {
    right: 0px;
  }
  @media ${device.mobile} {
    right: 0px;
    left: 0;
    bottom: -60px;
    margin: 0 auto;
  }
`;
const ApprovedText = styled.span`
  color: ${({ theme }) => theme.colors.secondaryColor};
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`;
const PendingText = styled.span`
  color: ${({ theme }) => theme.colors.primaryOrange};
`;
const AccountStatus = styled.div`
  @media ${device.mobile} {
    p {
      font-size: 18px;
      line-height: 20px;
    }
  }
`;
export {
  Tab,
  TabBody,
  TabButton,
  LiveAccountMain,
  TabContainer,
  TabHead,
  TabContent,
  TabHeadTxt,
  MultiStepProfile,
  Progress,
  ProgressBar,
  Codecontainer,
  Input2,
  EmailVerifyMain,
  EmailVerifySec,
  ImagTag,
  Phoneverifycontainer,
  PhoneInputController,
  PInformationMain,
  FormCon,
  Personalinfocontainer,
  Finputc,
  Dinputc,
  InputMain,
  FinancialInfo,
  RadioBox,
  RadioButton,
  FinancialMain,
  BackMain,
  ApprovedStatus,
  ApprovedText,
  PendingText,
  AccountStatus,
};
