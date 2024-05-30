import styled from "styled-components";
import { device } from "../../styles/device";

export const TtableResponsive = styled.div`
  width: 100%;
  text-align: center;
  padding: 25px 0;
  @media ${device.tablet} {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 100%;

  .CTable {
    border-radius: 13px;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.fourLightGray};
  }
  /* Chrome, Edge, and Safari */
  .CTable::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mainBgColor};
    border-radius: 13px;
    min-height: 340px;
  }
  .CTable::-webkit-scrollbar {
    width: 3px;
  }
  .CTable::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background-color: ${({ theme }) => theme.colors.fourLightGray};
    height: 181px;
  }
`;

export const STHead = styled.thead`
  display: table;
  width: 100%;
`;

export const STHeadTR = styled.tr`
  padding: 8px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  font-weight: 600;
  font-size: 14px;
`;

export const STH = styled.th`
  color: ${({ theme }) => theme.colors.secondaryBlack};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryWhite};
  padding: 8px 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: ${({ align }) => align};
  width: ${({ clmLength }) => 100 / clmLength}%;
  min-width: ${({ minWidth }) => minWidth};

  svg {
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.slightGray};
  }
  .arrow-green {
    color: ${({ theme }) => theme.colors.primaryColorGreen};
    transform: rotate(180deg);
  }
  @media ${device.tablet} {
    padding: 8px 3px;
  }
`;

export const STBody = styled.tbody`
  color: ${({ theme }) => theme.colors.mainBlack};

  display: block;
  overflow-y: scroll;
  max-height: 550px;
  margin-top: 8px;
`;

export const STBodyTR = styled.tr``;

export const STD = styled.td`
  padding: 10px 8px;
  font-size: 11px;
  line-height: 13px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryWhite};
  border-collapse: collapse;
  min-width: ${({ minWidth }) => minWidth};
  width: ${({ clmLength }) => 100 / clmLength}%;
  text-align: ${({ align }) => align};
  @media ${device.tablet} {
    padding: 8px;
    min-width: 80px;
  }
`;
