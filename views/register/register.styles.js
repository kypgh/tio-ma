import styled from "styled-components";

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
const IconImgPass = styled.div`
  background: url("/assets/images/view-off.png") no-repeat right;
`;

export { ForgotPassword, CreateAccount, IconImgPass };
