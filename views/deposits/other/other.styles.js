import styled from "styled-components";
import { device } from "../../../styles/device";

export const TabContent = styled.div``;
export const OthersMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 405px;
  text-align: center;

  .title_sm {
    margin: 27px 0;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }
  .finput-box {
    width: 345px;
  }
  @media ${device.tablet} {
    min-height: 320px;
    .finput-box,
    .dropdown-flex {
      width: 100%;
    }
  }
  @media ${device.mobile} {
    min-height: 250px;
  }
`;
export const SpanTxt = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  position: absolute;
  right: 0;
  @media ${device.tablet} {
    right: 28px;
  }
  @media ${device.mobile} {
    right: 0px;
  }
`;
