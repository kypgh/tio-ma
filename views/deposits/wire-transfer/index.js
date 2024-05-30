import React, { useState } from "react";
import {
  TabContent,
  WireTransMain,
  TabContainerInner,
  TabHead,
  Tab,
  TabButton,
  TabBodyDeposits,
  AssistanceText,
} from "../wire-transfer/wire-transfer.styles";
import USDLang from "../usd-lang-wire";
import EURLang from "../eur-lang-wire";
import GBPLnag from "../gbp-lang-wire";
import { ParaText } from "../../../components/Typography";

export default function WireTransfer({pageTranslations}) {
  const {
    wireTransferTxtOne,
    wireTransferTxtTwo,
    wireTransferTxtThree
  }= pageTranslations

  const [activeTab, setActiveTab] = useState(1);
  return (
    <TabContent>
      <WireTransMain>
        <ParaText pmt={"0px"} pmb={"0px"}>
          {wireTransferTxtOne}:
        </ParaText>
        <ParaText pmt={"0px"} pmb={"15px"}>
          {wireTransferTxtTwo}
        </ParaText>
        <TabContainerInner>
          <TabHead>
            <Tab>
              <TabButton
                variant="link"
                className={`${activeTab === 1 && "tabs-active"}`}
                onClick={() => setActiveTab(1)}
              >
                USD
              </TabButton>
            </Tab>
            <Tab>
              <TabButton
                variant="link"
                className={`${activeTab === 2 && "tabs-active"}`}
                onClick={() => setActiveTab(2)}
              >
                EUR
              </TabButton>
            </Tab>
            <Tab>
              <TabButton
                variant="link"
                className={`${activeTab === 3 && "tabs-active"}`}
                onClick={() => setActiveTab(3)}
              >
                GBP
              </TabButton>
            </Tab>
          </TabHead>
          <TabBodyDeposits>
            {activeTab === 1 && <USDLang pageTranslations={pageTranslations}/>}
            {activeTab === 2 && <EURLang pageTranslations={pageTranslations}/>}
            {activeTab === 3 && <GBPLnag pageTranslations={pageTranslations}/>}
          </TabBodyDeposits>
        </TabContainerInner>
      </WireTransMain>
      <AssistanceText>
       {wireTransferTxtThree}
      </AssistanceText>
    </TabContent>
  );
}
