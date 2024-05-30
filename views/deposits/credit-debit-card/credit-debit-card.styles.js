import styled from "styled-components";
import { device } from "../../../styles/device";

const TabContent = styled.div``;
const CDCMain = styled.div``;
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
  margin-top: 24px;

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
export { TabContent, CDCMain, Finputc, Dinputc };
