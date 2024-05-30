import styled from "styled-components";
import { device } from "../../../styles/device";

const StyledBurger = styled.div`
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: none;
  border: 0;
  svg {
    color: ${({ theme }) => theme.colors.tertiaryDarkGray};
    font-size: 22px;
  }
  @media ${device.tablet} {
    display: inline-block;
    vertical-align: middle;
    .btn-user {
      padding: 0px;
    }
  }
`;
const SidebarStyledMenu = styled.div`
  background: ${({ theme }) => theme.colors.mainBgColor};
  min-width: 135px;
  min-height: 100vh;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 16%);
  position: fixed;
  top: 56px;
  left: -100%;
  z-index: 1;
  transition: 0.5s;
  &.active {
    left: 0;
  }
`;
const SidebarOverlayStyled = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;
export { StyledBurger, SidebarStyledMenu, SidebarOverlayStyled };
