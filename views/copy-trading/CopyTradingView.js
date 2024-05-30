import React, { useEffect, useState } from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { useRouter } from "next/router";
import styled from "styled-components";
import ModalHook from "@/components/ModalHook";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import Link from "next/link";
import { theme } from "@/styles/theme";
import { device } from "@/styles/device";
import CarouselSection from "./CarouselSection";
import BecomeProvider from "./BecomeProvider";
import SearchProviders from "./SearchProviders";

const Hero = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 991px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.p`
  margin: 0 auto;
  font-size: 20px;
  text-align: center;
  font-weight: unset;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 25px auto 40px;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const CusLink = styled(Link)`
  background: ${theme.colors.primaryButtonLinearBG};
  color: ${theme.colors.mainWhite};
  font-weight: ${({ weight }) => weight || 700};
  font-size: ${({ size }) => size || "14px"};
  border-radius: 8px;
  padding: 10px 20px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease-in;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  width: ${({ width }) => `${width}px` || "100%"};
  text-align: center;

  &:hover {
    /* border: 1px solid ${theme.colors.primaryColor}; */
    background-position-x: -10px;
  }

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

const BlueLink = styled(Link)`
  background: ${({ light }) =>
    light ? theme.colors.slightGray : theme.colors.secondaryColor};
  color: ${({ light }) =>
    light ? theme.colors.mainBlack : theme.colors.mainWhite};
  border-radius: 7px;
  cursor: pointer;
  width: ${({ width }) => `${width}px` || "100%"};
  padding: 10px 20px;
  border: 1px solid
    ${({ light }) => (light ? theme.colors.slightGray : "transparent")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => size ?? "14px"};
  font-weight: ${({ weight }) => weight ?? 700};

  &:hover {
    background-color: ${({ light }) =>
      light ? theme.colors.sevenGrayDark : theme.colors.mainWhite};
    color: ${({ light }) =>
      light ? theme.colors.mainBlack : theme.colors.mainBlack};
    border: 1px solid
      ${({ light }) =>
        light ? theme.colors.sevenGrayDark : theme.colors.mainBlack};
  }

  &:disabled {
    background: ${theme.colors.silverLightGray};
    color: ${theme.colors.mainWhite};
    pointer-events: none;
  }
`;

const CopyTradingView = ({ rankData, returnData, sharpeData, balanceData }) => {
  const router = useRouter();
  const { query } = router;
  const { has_copy_trading } = query;
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    setHasAccount(has_copy_trading?.toLocaleLowerCase() === "true");
  }, [has_copy_trading]);

  return (
    <RightContainer>
      <Mcontainer hideRefetch>
        <Hero>
          <Title>Copy Traders Or Be Copied</Title>
          <Subtitle>
            Copy trading provides you with the ability to tap into expertise and
            strategies of other traders.
          </Subtitle>
          <Subtitle>
            Alternatively, you can showcase your trading skills to attract
            followers to copy your trades and get rewarded.
          </Subtitle>
          <BtnContainer>
            <ModalHook componentToShow={<BecomeProvider />}>
              {({ openModal }) =>
                hasAccount ? (
                  <CusLink
                    href={
                      "https://social-mt5.tiomarkets.com/portal/registration/provider"
                    }
                    target="_blank"
                    width="180"
                  >
                    Become a provider
                  </CusLink>
                ) : (
                  <ButtonPrimary width="180" onClick={openModal}>
                    Become a provider
                  </ButtonPrimary>
                )
              }
            </ModalHook>
            {hasAccount && (
              <BlueLink
                width="180"
                href={"https://social-mt5.tiomarkets.com/portal/login"}
                target="_blank"
              >
                Login
              </BlueLink>
            )}
          </BtnContainer>
        </Hero>
        {/* <CarouselSection
          data={rankData}
          title={"Top Rated Providers (Rating)"}
          hasAccount={hasAccount}
        /> */}
        <CarouselSection
          data={returnData}
          title={"Providers With Highest Return (Last 30 Days)"}
          hasAccount={hasAccount}
        />
        <CarouselSection
          data={sharpeData}
          title={"Top Risk Adjusted Return Providers (Sharpe Ratio)"}
          hasAccount={hasAccount}
        />
        <CarouselSection
          data={balanceData}
          title={"Most Heavily Invested Providers (Balance)"}
          hasAccount={hasAccount}
        />
        <SearchProviders data={rankData} />
      </Mcontainer>
    </RightContainer>
  );
};

export default CopyTradingView;
