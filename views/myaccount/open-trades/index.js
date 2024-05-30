import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TitleH1 } from "../../../components/Typography";
import { RightContainer } from "../../../styles/sharedstyles";
import Mcontainer from "../../../components/Mcontainer";
import { theme } from "../../../styles/theme";
import {
  useGetAccountTrades,
  useGetUserAccountById,
} from "../../../utils/hooks/queryHooks";
import {
  AccountMain,
  LiveAccountMain,
  OpenLiveAccount,
  TabContent,
  TCa,
  TCp,
} from "../myaccount.styles";
import { formatDate } from "../../../utils/functions";
import aLinks from "../../../config/aLinks";
import { IoIosArrowBack } from "react-icons/io";
import {
  CRYPTO_CURRENCIES,
  FOREX_SYMBOLS,
  FOREX_SYMBOLS_USD_CONVERSIONS,
  NEXT_PUBLIC_PRICE_FEED_WS,
  USD_SYMBOLS,
} from "../../../config/enums";
import useWebsocket from "../../../utils/hooks/useWebsocket";
import styled from "styled-components";
import ButtonSecondary from "../../../components/Buttons/ButtonSecondary";
import RowTable from "../../../components/Table/RowTable";
import { formaOpenTData } from "../../../utils/helperTable";

const BtnContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 15px;
`;

function getDataRequestString(_symbols, accountCurrency) {
  let symbols = [...new Set(_symbols)];
  let extraSymbols = [];
  for (const symbol of symbols) {
    if (!symbol.includes("USD") && FOREX_SYMBOLS.includes(symbol)) {
      let res = FOREX_SYMBOLS_USD_CONVERSIONS[symbol];
      if (
        res &&
        (!extraSymbols.includes(res.conv) || !symbols.includes(symbol))
      ) {
        extraSymbols.push(res);
      }
    }
  }
  if (accountCurrency !== "USD") {
    let currencyConversion = USD_SYMBOLS.find((s) =>
      s.includes(accountCurrency)
    );
    if (
      currencyConversion &&
      !extraSymbols.includes(currencyConversion) &&
      !symbols.includes(currencyConversion)
    ) {
      extraSymbols.push(currencyConversion);
    }
  }
  return `symbols:${[...symbols, ...extraSymbols].join(",")}`;
}

export default function OpenTrades({ pageTranslations }) {
  const router = useRouter();
  const { query } = router;

  const {
    openTrades,
    headT1,
    headT2,
    headT3,
    headT4,
    headT5,
    headT6,
    headT7,
    headT8,
  } = pageTranslations;

  const headerData = [
    {
      fieldName: "Ticket",
      columnName: headT1,
      options: "true",
      align: "center",
    },
    {
      fieldName: "Symbol",
      columnName: headT2,
      options: "",
      align: "center",
    },
    {
      fieldName: "Action",
      columnName: headT3,
      options: "",
      align: "center",
    },
    {
      fieldName: "Opend",
      columnName: headT4,
      options: "",
      align: "center",
    },
    {
      fieldName: "OpenPrice",
      columnName: headT5,
      options: "",
      align: "center",
    },
    {
      fieldName: "Profit",
      columnName: headT6,
      options: "",
      align: "center",
    },
    // {
    //   fieldName: "Swaps",
    //   columnName: headT7,
    //   options: "",
    //   align: "center",
    // },
    // {
    //   fieldName: "Commissions",
    //   columnName: headT8,
    //   options: "",
    //   align: "center",
    // },
  ];

  const { accountId } = query;

  const { data: accountData } = useGetUserAccountById(accountId, {
    enabled: !!accountId,
  });

  const [priceFeed, setPriceFeed] = useState([]);
  const { sendData } = useWebsocket(NEXT_PUBLIC_PRICE_FEED_WS, {
    onMessage: (ws, message) => {
      if (!message.data) return;
      try {
        setPriceFeed(JSON.parse(message.data));
      } catch (err) {}
    },
  });
  const [page, setPage] = useState(1);

  const { data } = useGetAccountTrades(accountId, "open", page, {
    enabled: !!accountData?.account,
    initialData: [],
    onSuccess: (res) => {
      let symbols = res?.docs?.map((v) => v.symbol) || [];
      let request = getDataRequestString(symbols, accountData.account.currency);
      sendData(request);
    },
    refetchInterval: 3000,
  });

  const { hasNextPage, hasPrevPage, totalPages } = data || {};

  const backAccountTab = () => {
    router.push(aLinks.myaccount);
  };
  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlider /> */}
        <Mcontainer bxshadow={theme.colors.primaryBoxShadow}>
          <AccountMain>
            <TitleH1>
              {openTrades + ": "}
              <strong className="pl-5">
                {accountData?.account?.login_id}{" "}
                {accountData?.account?.platform}
              </strong>
            </TitleH1>
            <OpenLiveAccount>
              <a className="btn mr-15" onClick={backAccountTab}>
                <IoIosArrowBack size={26} style={{ cursor: "pointer" }} />
              </a>
            </OpenLiveAccount>
          </AccountMain>
          <TabContent>
            <LiveAccountMain>
              <RowTable
                hdata={headerData}
                rdata={formaOpenTData(
                  data?.docs,
                  priceFeed,
                  accountData?.account
                )}
              />
            </LiveAccountMain>
          </TabContent>
          {totalPages > 1 && (
            <BtnContainer>
              <ButtonSecondary
                width={100}
                disabled={!hasPrevPage}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Previous
              </ButtonSecondary>
              <ButtonSecondary
                width={100}
                disabled={!hasNextPage}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </ButtonSecondary>
            </BtnContainer>
          )}
        </Mcontainer>
      </RightContainer>
    </>
  );
}
