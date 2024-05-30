import styled from "styled-components";
import { device } from "../../styles/device";

const MetaquotesCont = styled.div`
  background: rgba(244, 245, 246, 0.2);
  border: 1px solid rgba(42, 53, 61, 0.5);
  border-radius: 5px;
  padding: 12px 30px;
  display: flex;

  label {
    display: inline-block;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.secondaryBlack};
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
`;
const DownloadMainSec = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryWhite};
  padding: ${({ pall }) => (pall ? pall : "35px 0")};

  &:last-child {
    border-bottom: 0px;
  }
`;

const DownloadContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 39px;
  justify-content: flex-start;
  @media ${device.laptopL} {
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 32px;
  }
  @media ${device.tablet} {
    grid-template-columns: auto auto auto;
  }
  @media ${device.mobile} {
    grid-template-columns: auto auto;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    justify-content: space-between;
  }
  @media ${device.mobile} {
    grid-template-columns: auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-content: center;
  }
`;

export { MetaquotesCont, DownloadMainSec, DownloadContainer };
