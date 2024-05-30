import styled from "styled-components";
import { device } from "../../styles/device";

const IconImgPass = styled.div`
  position: relative;
  width: 100%;
`;
const ImgIcons = styled.svg`
  cursor: pointer;
  position: absolute;
  width: 20px;
  right: 8px;
  bottom: 46px;
  color: ${({ theme }) => theme.colors.darkGrayishBlue};
  @media ${device.mobile} {
    bottom: 28px;
  }
`;
const TioImgIcons = styled.svg`
  cursor: pointer;
  position: absolute;
  width: 20px;
  right: 8px;
  top: 17px;
  color: ${({ theme }) => theme.colors.darkGrayishBlue};
  @media ${device.mobile} {
    bottom: 28px;
  }
`;
const ForgotPassword = styled.h4`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryColor};
  letter-spacing: 0em;
  cursor: pointer;
  margin: 0px;
`;

const CreateAccount = styled.div`
  letter-spacing: 0em;
  margin-top: 30px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  .text-blue {
    color: ${({ theme }) => theme.colors.secondaryColor};
    margin-left: 5px;
  }
`;
const RememberContainer = styled.div`
  margin-bottom: 0px;
  margin-top: 15px;
  display: flex;
  a {
    text-decoration: underline;
  }
  label {
    display: flex;
    align-items: flex-start;
  }
  .mychk-remember {
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    border: 1px solid ${({ theme }) => theme.colors.silverLightGray};
    border-radius: 3px;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    margin-left: 7px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
`;

export {
  ForgotPassword,
  CreateAccount,
  IconImgPass,
  ImgIcons,
  TioImgIcons,
  RememberContainer,
};
