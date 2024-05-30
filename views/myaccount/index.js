import React, { useEffect, useState } from "react";
import BecomePartnerSlider from "../../components/BecomePartnerSlider/index";
import { TitleH1 } from "../../components/Typography";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import Deleted from "./deleted";
import Demo from "./demo";
import Live from "./live";
import {
  AccountMain,
  ButtonLink,
  OpenLiveAccount,
  Tab,
  TabBody,
  TabButton,
  TabContainer,
  TabHead,
} from "./myaccount.styles";
import OpenDemoAccount from "./open-demo";
import OpenLive from "./open-live";
import { theme } from "../../styles/theme";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import ReadOnly from "../../components/ReadOnly";
import aLinks from "../../config/aLinks";
import useWindowSize from "../../utils/hooks/useWindowSize";

const OpenAccBtn = styled.div`
  padding: 10px 15px;
  color: ${theme.colors.secondaryBlack};
  border: 1px solid ${theme.colors.secondaryLightGray};
  border-radius: 3px;
  display: flex;
  gap: 10px;
  align-items: center;
  transition: 0.3s all ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.mainWhite};
    background-color: ${theme.colors.secondaryColor};
    border: 1px solid ${theme.colors.secondaryColor};
  }

  & svg {
    transition: 0.3s all ease;
    color: ${theme.colors.secondaryColor};
  }

  &:hover svg {
    color: ${theme.colors.mainWhite};
  }
`;

export default function Myaccount({ pageTranslations, genericTranslations }) {
  const {
    openLiveAccount,
    openDemoAccount,
    myAccountTitle,
    liveTab,
    demoTab,
    closeAccountsTab,
    openLiveAccounts,
    openDemoAccounts,
    openLiveHead,
    openDemoHead,
  } = pageTranslations;

  const [isGrid, setIsGrid] = useState(false);
  const router = useRouter();
  const { tab = "live" } = router.query;

  const goToOpenAccountLive = () => {
    router.push({ query: { ...router.query, tab: `open-live` } }, null, {
      shallow: true,
    });
  };
  const goToOpenAccountDemo = () => {
    router.push({ query: { ...router.query, tab: `open-demo` } }, null, {
      shallow: true,
    });
  };

  const backAccountTab = () => {
    router.push({ query: { ...router.query, tab: "live" } }, null, {
      shallow: true,
    });
  };

  const goToLive = () => {
    router.push({ query: { ...router.query, tab: "live" } }, null, {
      shallow: true,
    });
  };

  const goToDemo = () => {
    router.push({ query: { ...router.query, tab: "demo" } }, null, {
      shallow: true,
    });
  };

  const goToClosed = () => {
    router.push({ query: { ...router.query, tab: "closed-accounts" } }, null, {
      shallow: true,
    });
  };

  const { width } = useWindowSize();
  useEffect(() => {
    setIsGrid(width <= 475);
  }, [width <= 475]);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    return () => {
      setIsHydrated(false);
    };
  }, []);

  return (
    <>
      {router?.isReady && isHydrated && (
        <RightContainer>
          {/* <BecomePartnerSlider /> */}
          <Mcontainer bxshadow={theme.colors.primaryBoxShadow} hideRefetch>
            {["live", "demo", "closed-accounts"].includes(tab) && (
              <>
                <AccountMain>
                  <TitleH1 mt={"10px"} mb={"10px"}>
                    {myAccountTitle}
                  </TitleH1>
                  {["live", "demo"].includes(tab) && (
                    <ReadOnly url={aLinks.completeProfile}>
                      <OpenLiveAccount>
                        <OpenAccBtn
                          onClick={() => {
                            if (tab === "live") {
                              goToOpenAccountLive();
                            } else {
                              goToOpenAccountDemo();
                            }
                          }}
                        >
                          <AiFillPlusCircle />
                          <p>
                            {tab === "demo" ? openDemoAccount : openLiveAccount}
                          </p>
                        </OpenAccBtn>
                      </OpenLiveAccount>
                    </ReadOnly>
                  )}
                </AccountMain>
                <TabContainer>
                  <TabHead>
                    <Tab>
                      <TabButton
                        variant="link"
                        className={`tabs ${tab === "live" && "tabs-active"}`}
                        onClick={goToLive}
                      >
                        {liveTab}
                      </TabButton>
                    </Tab>
                    <Tab>
                      <TabButton
                        variant="link"
                        className={`tabs ${tab === "demo" && "tabs-active"}`}
                        onClick={goToDemo}
                      >
                        {demoTab}
                      </TabButton>
                    </Tab>
                    <Tab>
                      <TabButton
                        variant="link"
                        className={`tabs ${
                          tab === "closed-accounts" && "tabs-active"
                        }`}
                        onClick={goToClosed}
                      >
                        {closeAccountsTab}
                      </TabButton>
                    </Tab>
                  </TabHead>
                  <TabBody>
                    {tab === "live" && (
                      <Live
                        pageTranslations={pageTranslations}
                        genericTranslations={genericTranslations}
                        isGrid={isGrid}
                        setIsGrid={setIsGrid}
                      />
                    )}
                    {tab === "demo" && (
                      <Demo
                        pageTranslations={pageTranslations}
                        genericTranslations={genericTranslations}
                        isGrid={isGrid}
                        setIsGrid={setIsGrid}
                      />
                    )}
                    {tab === "closed-accounts" && (
                      <Deleted
                        pageTranslations={pageTranslations}
                        genericTranslations={genericTranslations}
                        isGrid={isGrid}
                        setIsGrid={setIsGrid}
                      />
                    )}
                  </TabBody>
                </TabContainer>
              </>
            )}
            {(tab == "open-live" || tab == "open-demo") && (
              <>
                <AccountMain>
                  <TitleH1>
                    {tab == "open-live" ? openLiveAccounts : openDemoAccounts}
                  </TitleH1>
                  <OpenLiveAccount>
                    <a onClick={backAccountTab}>
                      <IoIosArrowBack size={26} style={{ cursor: "pointer" }} />
                    </a>
                  </OpenLiveAccount>
                </AccountMain>
                <TabContainer>
                  <TabHead>
                    <Tab>
                      <TabButton
                        variant="link"
                        className={`tabs ${
                          tab === "open-live" && "tabs-active"
                        }`}
                        onClick={goToOpenAccountLive}
                      >
                        {openLiveHead}
                      </TabButton>
                    </Tab>
                    <Tab>
                      <TabButton
                        variant="link"
                        className={`tabs ${
                          tab === "open-demo" && "tabs-active"
                        }`}
                        onClick={goToOpenAccountDemo}
                      >
                        {openDemoHead}
                      </TabButton>
                    </Tab>
                  </TabHead>
                  <TabBody>
                    {tab === "open-live" && (
                      <OpenLive
                        pageTranslations={pageTranslations}
                        genericTranslations={genericTranslations}
                      />
                    )}
                    {tab === "open-demo" && (
                      <OpenDemoAccount pageTranslations={pageTranslations} />
                    )}
                  </TabBody>
                </TabContainer>
              </>
            )}
          </Mcontainer>
        </RightContainer>
      )}
    </>
  );
}
