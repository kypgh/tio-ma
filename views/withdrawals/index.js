import React from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import {
  TabContainer,
  TabHead,
  Tab,
  TabBody,
  TabButton,
} from "./withdrawals.styles";
import WithdrawalCashier from "./withdrawal-cashier";
import WithdrawalCrypto from "./withdrawal-crypto";
import { theme } from "../../styles/theme";
import { useRouter } from "next/router";
import useUserFlags from "../../utils/hooks/useUserFlags";
import OpenAccount from "../../components/OpenAccount";
import styled from "styled-components";

const NewTab = styled(Tab)`
  min-width: 120px;
  border: 1px solid rgb(0 0 0 / 3%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Withdrawals({ pageTranslations, genericTranslations }) {
  const { isEmailVerified } = useUserFlags();

  const router = useRouter();

  const { subTab = "bankwire" } = router.query;

  const goToSubTab = (subTab) => {
    router.push(
      {
        query: { tab: router.query.tab, subTab },
      },
      null,
      { shallow: true }
    );
  };

  const {
    withdrawalsTitle,
    localCurrencyTabName,
    cryptoTabName,
    dontHaveAccount,
    openLiveAccount,
    bankwireTabTitle,
  } = pageTranslations;

  return (
    <RightContainer>
      <Mcontainer hideRefetch>
        <TabContainer>
          <TabHead
            style={{
              padding: `0px`,
              border: "1px solid rgb(0 0 0 / 3%)",
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
                  color: subTab === "bankwire" && theme.colors.primaryColor,
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
                  color: subTab === "crypto" && theme.colors.primaryColor,
                  fontWeight: "700",
                }}
              >
                {cryptoTabName}
              </TabButton>
            </NewTab>
          </TabHead>
          <TabBody>
            {isEmailVerified ? (
              <>
                <div
                  style={{
                    display: subTab === "bankwire" ? "contents" : "none",
                  }}
                >
                  <WithdrawalCashier
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                </div>
                {subTab === "crypto" && (
                  <WithdrawalCrypto
                    pageTranslations={pageTranslations}
                    genericTranslations={genericTranslations}
                  />
                )}
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
