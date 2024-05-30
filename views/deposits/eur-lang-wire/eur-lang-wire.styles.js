import styled from "styled-components";
import { device } from "../../../styles/device";

const TabContent = styled.div`
  margin-bottom: 10px;
`;
const TtableResponsive = styled.div`
  width: 100%;
  text-align: center;

  @media ${device.tablet} {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const TableLang = styled.table`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryWhite};
  border-spacing: 0px;
  position: relative;

  &.arrow-top-eur:before {
    position: absolute;
    top: -10px;
    left: 48%;
    content: "";
    display: block;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.colors.secondaryWhite};
  }

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
const TableBody = styled.tbody``;
const TRl = styled.tr`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  text-align: left;
  padding: 8px 10px;
  :nth-child(even) {
    background-color: ${({ theme }) => theme.colors.secondaryWhite};
  }
`;
const TDl = styled.td`
  text-align: left;
  //padding: 8px 10px;
  &:nth-child(1) {
    padding: 8px 0px 8px 8px;
  }
  &:nth-child(2) {
    padding: 8px 10px 8px 0px;
  }
`;

export { TabContent, TtableResponsive, TableLang, TableBody, TRl, TDl };
