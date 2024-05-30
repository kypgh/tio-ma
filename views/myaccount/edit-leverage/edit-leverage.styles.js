import styled from "styled-components";
import { device } from "../../../styles/device";

const EditLeverageFrm = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 321px;

  label {
    margin-top: 5px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
  @media ${device.tablet} {
    min-height: 320px;
  }
  @media ${device.mobile} {
    min-height: 250px;
  }
  form {
    display: contents;
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
const ConfirmationMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const PasswordConfirmation = styled.div``;
const ButtonCenter = styled.div`
  display: inline-flex;
`;

export {
  EditLeverageFrm,
  Dinputc,
  ConfirmationMain,
  PasswordConfirmation,
  ButtonCenter,
};
