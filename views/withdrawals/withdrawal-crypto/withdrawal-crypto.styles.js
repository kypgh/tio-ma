import styled from "styled-components";
import { device } from "../../../styles/device";

const Form = styled.form``;
const WithdrawalContainer = styled.section`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 377px;
  margin-top: 26px;
  margin-bottom: 40px;
`;
const WithdrawalCryptoMain = styled.div`
  display: inline-table;

  @media ${device.tablet} {
    display: block;
    select,
    .crypot-input {
      width: 100%;
    }
  }

  @media ${device.mobile} {
    margin-top: 10px;
  }
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
  width: 100%;

  .dropdown-flex {
    display: inline-flex;
    flex-direction: column;
    @media ${device.mobile} {
      margin-bottom: 10px;
      margin-right: 0px;
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

export { Form, WithdrawalCryptoMain, WithdrawalContainer, Finputc, Dinputc };
