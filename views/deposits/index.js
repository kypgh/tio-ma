import React from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import {
  Tab,
  TabBody,
  TabButton,
  TabContainer,
  TabHead,
} from "./deposits.styles";
import BecomePartnerSlider from "../../components/BecomePartnerSlider/index";
import LocalCurrency from "../deposits/local-currency";
import Crypto from "../deposits/crypto";
import Other from "../deposits/other";
import Praxis from "../deposits/praxis-cashier";
import { theme } from "../../styles/theme";
import { useRouter } from "next/router";
import useUserFlags from "../../utils/hooks/useUserFlags";
import OpenAccount from "../../components/OpenAccount";
import styled from "styled-components";
import { device } from "@/styles/device";

const NewTab = styled(Tab)`
  min-width: 120px;
  border: 1px solid rgb(0 0 0 / 3%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.mobile} {
    min-width: 100px;
  }
`;

export default function Deposits({ pageTranslations, genericTranslations }) {
  const {
    depositsPageTitle,
    localCurrencyTabTitle,
    cryptoTabTitle,
    praxisCashierTabTitle,
    otherTabTitle,
    dontHaveAccount,
    openLiveAccount,
    bankwireTabTitle,
    visamastercardTabTitle,
  } = pageTranslations;

  const router = useRouter();

  const { subTab = "bankwire" } = router.query;

  const { isEmailVerified } = useUserFlags();

  const goToSubTab = (subTab) => {
    router.push(
      {
        query: { tab: router.query.tab, subTab },
      },
      null,
      { shallow: true }
    );
  };

  return (
    <RightContainer>
      <Mcontainer hideRefetch>
        <TabContainer>
          <TabHead
            style={{
              padding: `0px`,
              width: "fit-content",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <NewTab>
              <TabButton
                variant="link"
                className={`tabs`}
                onClick={() => {
                  goToSubTab("bankwire");
                }}
                style={{
                  color:
                    subTab === "bankwire" ? theme.colors.primaryColor : null,
                  fontWeight: "700",
                }}
              >
                {bankwireTabTitle}
              </TabButton>
            </NewTab>
            <NewTab>
              <TabButton
                variant="link"
                className={`tabs`}
                onClick={() => {
                  goToSubTab("crypto");
                }}
                style={{
                  color: subTab === "crypto" ? theme.colors.primaryColor : null,
                  fontWeight: "700",
                }}
              >
                {cryptoTabTitle}
              </TabButton>
            </NewTab>
            <NewTab>
              <TabButton
                variant="link"
                className={`tabs`}
                onClick={() => {
                  goToSubTab("visa");
                }}
                style={{
                  color: subTab === "visa" ? theme.colors.primaryColor : null,
                  fontWeight: "700",
                }}
              >
                {visamastercardTabTitle}
              </TabButton>
            </NewTab>
            {/* <NewTab>
              <TabButton
                variant="link"
                className={`tabs`}
                onClick={() => {
                  goToSubTab("other");
                }}
                style={{
                  color: subTab === "other" ? theme.colors.primaryColor : null,
                  fontWeight: "700",
                }}
              >
                {otherTabTitle}
              </TabButton>
            </NewTab> */}
          </TabHead>
          <TabBody>
            {isEmailVerified ? (
              <>
                {subTab === "bankwire" && (
                  <LocalCurrency
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                )}
                {subTab === "crypto" && (
                  <Crypto
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                )}
                {subTab === "visa" && (
                  <Praxis pageTranslations={pageTranslations} />
                )}
                {/* {subTab === "other" && (
                  <Other pageTranslations={pageTranslations} />
                )} */}
              </>
            ) : (
              <OpenAccount label={dontHaveAccount} btnMsg={openLiveAccount} />
            )}
          </TabBody>
        </TabContainer>
      </Mcontainer>
    </RightContainer>
  );
}
