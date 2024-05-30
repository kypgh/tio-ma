import { device } from "@/styles/device";
import { getNavItems } from "@/utils/navItems";
import Footers from "@/views/footer";
import Headers from "@/views/headers";
import IncompleteProfile from "@/views/headers/incompleteProfile";
import { useState } from "react";
import styled from "styled-components";
import BannerPromotion from "./BannerPromotion";
import LiveChatWrapper from "./LiveChat/LiveChatWrapper";
import NavbarItem from "./NavbarItem";

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  @media (min-width: 992px) {
    padding-right: 15px;
  }
`;

const SideNav = styled.div.attrs(({ $isOpen }) => ({ $isOpen }))`
  max-width: 135px;
  width: 100%;
  position: sticky;
  height: 100%;
  top: 61px;
  padding-top: 15px;

  @media ${device.tablet} {
    max-width: 165px;
    position: fixed;
    background-color: #f4f5f6;
    left: 0;
    transition: 0.3s all ease;
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0%" : "-100%")});
    z-index: 5;

    & svg {
      font-size: 20px;
    }
  }
`;

const ChildrenWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "none" : "auto")};
  user-select: ${({ $isOpen }) => ($isOpen ? "none" : "auto")};
  position: relative;
  padding-top: 10px;

  @media ${device.tablet} {
    padding: 10px;
  }
  @media ${device.mobile} {
    padding: 5px;
  }
`;

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

const Nav = ({
  isMobile,
  isPublicPath,
  genericTranslations,
  children,
  isKycApproved,
  isEligible,
}) => {
  const MENU_OPTIONS = getNavItems(genericTranslations, { isEligible });
  const [isOpen, setIsOpen] = useState(false);

  if (isPublicPath) {
    return (
      <>
        <Headers
          isMobile={isMobile}
          isPublicPath={isPublicPath}
          genericTranslations={genericTranslations}
          isOpen={isOpen}
        />
        {children}
        {genericTranslations && (
          <Footers genericTranslations={genericTranslations} />
        )}
      </>
    );
  }

  return (
    <>
      <Headers
        isMobile={isMobile}
        genericTranslations={genericTranslations}
        isOpen={isOpen}
        onClickBurger={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <Wrapper>
        <SideNav $isOpen={isOpen}>
          {MENU_OPTIONS.map((option) => (
            <NavbarItem
              name={option.name}
              icon={option.icon}
              url={option.url}
              key={option.url}
            />
          ))}
          <LiveChatWrapper />
        </SideNav>
        <ChildrenWrapper>
          {isMobile && isOpen && (
            <Bg
              onClick={() => {
                setIsOpen(false);
              }}
            />
          )}
          <IncompleteProfile
            genericTranslations={genericTranslations}
            isKycApproved={isKycApproved}
          />
          {children}
          <Footers genericTranslations={genericTranslations} />
        </ChildrenWrapper>
        <BannerPromotion />
      </Wrapper>
    </>
  );
};

export default Nav;
