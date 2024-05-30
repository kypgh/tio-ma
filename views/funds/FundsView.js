import React, { useEffect } from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { TitleH1 } from "../../components/Typography";
import {
  Tab,
  TabBody,
  TabButton,
  TabContainer,
  TabHead,
} from "../myaccount/myaccount.styles";
import Deposits from "../deposits";
import Withdrawals from "../withdrawals";
import TransactionHistory from "../transaction-history";
import { useRouter } from "next/router";

const FundsView = ({ pageTranslations, genericTranslations }) => {
  const router = useRouter();
  const tab = router.query.tab || "deposit";

  const goToTab = (tab) => {
    router.push(
      {
        query: { tab },
      },
      null,
      { shallow: true }
    );
  };

  return (
    <RightContainer>
      <Mcontainer hideRefetch>
        <TitleH1 mt={"10px"} mb={"10px"}>
          Funds
        </TitleH1>
        <TabContainer>
          <TabHead>
            <Tab>
              <TabButton
                variant="link"
                className={`tabs ${tab === "deposit" && "tabs-active"}`}
                onClick={() => goToTab("deposit")}
              >
                Deposit
              </TabButton>
            </Tab>
            <Tab>
              <TabButton
                variant="link"
                className={`tabs ${tab === "withdrawal" && "tabs-active"}`}
                onClick={() => goToTab("withdrawal")}
              >
                Withdrawal
              </TabButton>
            </Tab>
            <Tab>
              <TabButton
                variant="link"
                className={`tabs ${
                  tab === "transaction-history" && "tabs-active"
                }`}
                onClick={() => goToTab("transaction-history")}
              >
                Transaction History
              </TabButton>
            </Tab>
          </TabHead>
          <TabBody>
            {tab === "deposit" && (
              <Deposits
                pageTranslations={pageTranslations}
                genericTranslations={genericTranslations}
              />
            )}
            {tab === "withdrawal" && (
              <Withdrawals
                pageTranslations={pageTranslations}
                genericTranslations={genericTranslations}
              />
            )}
            {tab === "transaction-history" && (
              <TransactionHistory
                pageTranslations={pageTranslations}
                genericTranslations={genericTranslations}
              />
            )}
          </TabBody>
        </TabContainer>
      </Mcontainer>
    </RightContainer>
  );
};

export default FundsView;
