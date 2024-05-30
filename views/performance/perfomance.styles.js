import styled from "styled-components";
import { device } from "../../styles/device";

const AccountDetails = styled.div`
  & h2 {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const AccountDetailsRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AccountDetailsCol4 = styled.div`
  width: calc(100% / 3 - 40px / 3);
  min-width: 240px;
  flex: 1;
  max-width: calc(100% / 2 - 20px / 2);
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f5f6;

  @media only screen and (max-width: 650px) {
    width: 100%;
    flex: unset;
    max-width: 100%;
  }
`;
const AccountDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  :last-child {
    padding-bottom: 0px;
  }
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.secondaryBlack};
  font-size: 11px;
  line-height: 13px;
  font-style: normal;
  font-weight: 600;
`;
const SpanTxt = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: right;
  color: ${({ theme }) => theme.colors.lightGrayishBlue};
`;
const PieChartRow = styled.div`
  //padding: 30px 0;
  display: flex;
  column-gap: 55px;
  align-items: center;
  @media ${device.tablet} {
    display: block;
  }
`;
const PieChartCol6 = styled.div`
  width: 50%;
  margin-top: ${({ mt }) => (mt ? mt : "")};
  margin-bottom: ${({ mb }) => (mb ? mb : "")};
  display: inline-block;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
    width: 100%;
    margin-top: 20px;
  }
`;
export {
  AccountDetails,
  AccountDetailsRow,
  AccountDetailsCol4,
  AccountDetail,
  Label,
  SpanTxt,
  PieChartRow,
  PieChartCol6,
};
