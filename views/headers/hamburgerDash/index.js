import { default as React, useEffect, useState } from "react";
import {
  SidebarStyledMenu,
  StyledBurger,
  SidebarOverlayStyled,
} from "./hamburgerdash.styles";
import { Dflex } from "../../../styles/sharedstyles";
import NavbarItem from "../../../components/NavbarItem";
import { RiMenuFill, RiMenuFoldLine } from "react-icons/ri";
import { PUBLIC_PATHS } from "../../../config/enums";
import { useRouter } from "next/router";

import useIsEligibleForTC from "../../../utils/hooks/useIsEligibleForTC";
import { getNavItems } from "../../../utils/navItems";
import LiveChatWrapper from "@/components/LiveChat/LiveChatWrapper";

export default function Hamburgerdash({ genericTranslations }) {
  const [isOpen, setIsopen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isEligible } = useIsEligibleForTC();
  const MENU_OPTIONS = getNavItems(genericTranslations, { isEligible });

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (!PUBLIC_PATHS.includes(router.pathname)) {
      setIsMounted(true);
    }
  }, [router.pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StyledBurger className="mr-40">
        <div onClick={ToggleSidebar}>
          {isOpen ? <RiMenuFoldLine /> : <RiMenuFill />}
        </div>

        <Dflex>
          <SidebarStyledMenu className={`${isOpen == true ? "active" : ""}`}>
            {MENU_OPTIONS.map((option) => (
              <NavbarItem
                name={option.name}
                icon={option.icon}
                url={option.url}
                key={option.url}
              />
            ))}
            <LiveChatWrapper />
          </SidebarStyledMenu>
        </Dflex>
        <SidebarOverlayStyled
          className={`${isOpen == true ? "active" : ""}`}
          onClick={ToggleSidebar}
        ></SidebarOverlayStyled>
      </StyledBurger>
    </>
  );
}
