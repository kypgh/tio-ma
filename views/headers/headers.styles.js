import styled from "styled-components";
import { device } from "../../styles/device";

const Header = styled.header`
  background: ${({ theme }) => theme.colors.mainBlack};
  z-index: 9999;
  position: sticky;
  top: 0;
`;
const Appheaderleft = styled.div`
  padding: 15px 0px;
  display: inline-block;
  vertical-align: middle;
  @media ${device.tablet} {
    display: flex;
    align-items: center;
    .navbar-brand {
      width: auto;
      margin-right: 25px;
    }
  }
  @media ${device.mobile} {
    .navbar-brand {
      margin-right: 15px;
    }
  }
`;
const Appheaderright = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  position: relative;
  z-index: 6;
  vertical-align: middle;
  @media ${device.tablet} {
    justify-content: center;
    padding-bottom: 0px;
  }
`;

export { Header, Appheaderleft, Appheaderright };
