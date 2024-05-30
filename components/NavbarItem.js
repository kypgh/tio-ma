import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { device } from "../styles/device";
import aLinks from "../config/aLinks";

const SideNavItem = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  padding: 10px 0;
  padding-left: 15px;
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${({ isDisabled, theme }) =>
    isDisabled
      ? `${theme.colors.tertiaryLightGray} !important`
      : theme.colors.secondaryBlack};

  border-radius: 5px;
  margin-bottom: 10px;

  svg {
    font-size: 22px;
    min-width: 22px;
    color: ${({ isDisabled, theme }) =>
      isDisabled
        ? theme.colors.tertiaryLightGray
        : theme.colors.tertiaryDarkGray};
  }

  &.menu-active {
    /* background: ${({ theme }) => theme.colors.mainWhite}; */
    svg {
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }
  &:hover {
    background: ${({ theme }) => theme.colors.mainWhite};

    svg {
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }

  @media ${device.tablet} {
    text-align: left;
    padding: 10px 15px;
    svg {
      display: inline-block;
      vertical-align: middle;
      /* margin-right: 10px; */
    }
    &.menu-active {
      svg {
        display: inline-block;
        vertical-align: middle;
      }
    }
    &:hover {
      svg {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
`;
const SideNavTitle = styled.div`
  padding-top: 5px;
  @media ${device.tablet} {
    display: inline-block;
    vertical-align: middle;
    padding-top: 0px;
  }
`;

// this is for the pages that are not navigatable from the sidebar to highlight the menu item
const subMenu = {
  [aLinks.openTrades.split("/")[1]]: aLinks.myaccount,
  [aLinks.closedTrades.split("/")[1]]: aLinks.myaccount,
  [aLinks.editLeverage.split("/")[1]]: aLinks.myaccount,
  [aLinks.transferFunds.split("/")[1]]: aLinks.myaccount,
  [aLinks.completeProfile.split("/")[1]]: aLinks.myaccount,
};

export default function NavbarItem({ name, icon, url }) {
  const router = useRouter();
  const page = router.pathname.split("/")[1];
  let selected = router.pathname === url || subMenu[page]?.includes(url);

  return (
    <Link href={{ pathname: url }}>
      <SideNavItem className={selected && "menu-active"}>
        {icon}
        <SideNavTitle>{name}</SideNavTitle>
      </SideNavItem>
    </Link>
  );
}
