import Link from "next/link";
import { CiCircleMore } from "react-icons/ci";
import { FaChartLine, FaEye } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { MdOutlineDone, MdOutlinePending } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import AccountActions from "../components/AccountActions";
import { SVGFlag } from "../components/Flags/dist";
import Tooltip from "../components/TooltipThemis";
import aLinks from "../config/aLinks";
import {
  CRYPTO_CURRENCIES,
  FOREX_SYMBOLS,
  FOREX_SYMBOLS_USD_CONVERSIONS,
  TIO_CTRADER_LIVE_ACCOUNT_TYPES,
  USD_SYMBOLS,
} from "../config/enums";
import { BsFillGearFill } from "react-icons/bs";
import { FaBtc, FaEthereum } from "react-icons/fa";
import { theme } from "../styles/theme";
import {
  TCa,
  TCd,
  TCi,
  TCp,
  TcBtn,
  TCt,
} from "../views/myaccount/myaccount.styles";
import { formatCurrency, formatDate } from "./functions";
import { TCs } from "../views/transaction-history/transactionHistory.styles";

const Flexit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Btn = styled.button`
  font-size: 12px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #111111;
  color: ${theme.colors.primaryBlue};
`;

const mappedPlatforms = {
  mt4: "MT4",
  mt5: "MT5",
  ctrader: "cTrader",
};

const Profit = styled.p`
  color: ${({ isPositive }) =>
    isPositive ? theme.colors.primaryColorGreen : theme.colors.primaryRed};
`;

const ProfitStyle = styled.div`
  color: ${({ profit }) => (profit > 0 ? "green" : profit == 0 ? "" : "red")};
`;

const mappedAccountTypes = TIO_CTRADER_LIVE_ACCOUNT_TYPES.reduce(
  (acc, curr) => {
    acc[curr.name] = curr.label;
    return acc;
  },
  {}
);

export function formatAccountsData(data, pageTranslations, isGrid) {
  const { overview } = pageTranslations;

  return (
    data?.map((key) => {
      return {
        ...key,
        ...(!isGrid && { Accounts: key.login_id && <TCa>{key.login_id}</TCa> }),
        ...(isGrid && { Accounts: key.login_id && <TCt>{key.login_id}</TCt> }),
        Platform: key.platform && <TCp>{mappedPlatforms[key.platform]}</TCp>,
        Type: key.environment_type && (
          <TCt colors={""}>{key.environment_type}</TCt>
        ),
        AccType: key.account_type && (
          <TCp style={{ textTransform: "uppercase" }}>
            {mappedAccountTypes[key.account_type] || key.account_type}
          </TCp>
        ),
        Server: key.server && <TCt>{key.server}</TCt>,
        Opend: formatDate(key.createdAt),
        ...(!isGrid && { Currency: key.currency }),
        ...(isGrid && {
          Currency: (key.currency == "BTC" && (
            <TCi>
              <FaBtc size={30} />
            </TCi>
          )) ||
            (key.currency == "ETH" && (
              <TCi>
                <FaEthereum size={30} />
              </TCi>
            )) || (
              <TCi>
                <SVGFlag
                  country={key.currency.slice(0, 2).toLowerCase()}
                  flagWidth="160"
                />
              </TCi>
            ),
        }),
        Leverage: key.leverage && `1:${key.leverage}`,
        Balance:
          key.balance &&
          key.currency &&
          formatCurrency(key.balance, key.currency),
        Equity:
          key.equity &&
          key.currency &&
          formatCurrency(key.equity, key.currency),
        Performance: (
          <TCd
            bgcolors={theme.colors.mainWhite}
            style={{
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <Tooltip
              content={overview}
              style={{
                width: "max-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href={{
                  pathname: aLinks.performance,
                  query: {
                    account: key._id,
                  },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaEye size={16} color="#111111" />
              </Link>
            </Tooltip>
            <Tooltip
              content={"Open Trades"}
              style={{
                width: "max-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href={{
                  pathname: aLinks.openTrades,
                  query: {
                    accountId: key._id,
                  },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaChartLine size={16} color="#111111" />
              </Link>
            </Tooltip>
            <Tooltip
              content={"Closed Trades"}
              style={{
                width: "max-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href={{
                  pathname: aLinks.closedTrades,
                  query: {
                    accountId: key._id,
                  },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiArchive size={16} color="#111111" />
              </Link>
            </Tooltip>
          </TCd>
        ),
        ...(!isGrid && {
          Actions: (
            <Flexit>
              <Tooltip
                style={{
                  width: "fit-content",
                }}
                content={"Deposit"}
              >
                <Link
                  href={{
                    pathname: aLinks.funds,
                    query: {
                      tab: "deposit",
                      subTab: CRYPTO_CURRENCIES.includes(key.currency)
                        ? "crypto"
                        : "bankwire",
                      accountId: key._id,
                      currency: key.currency,
                    },
                  }}
                >
                  <Btn>Deposit</Btn>
                </Link>
              </Tooltip>
              <Tooltip
                style={{
                  width: "fit-content",
                }}
                content={"Withdrawal"}
              >
                <Link
                  href={{
                    pathname: aLinks.funds,
                    query: {
                      tab: "withdrawal",
                      subTab: CRYPTO_CURRENCIES.includes(key.currency)
                        ? "crypto"
                        : "bankwire",
                      accountId: key._id,
                    },
                  }}
                >
                  <Btn>Withdrawal</Btn>
                </Link>
              </Tooltip>
              <Tooltip
                useOnClickInstead
                bgColor={theme.colors.mainWhite}
                position="bottom"
                content={
                  <AccountActions
                    account={key}
                    pageTranslations={pageTranslations}
                  />
                }
              >
                <CiCircleMore size={20} style={{ cursor: "pointer" }} />
              </Tooltip>
            </Flexit>
          ),
        }),
      };
    }) || []
  );
}

export function formatDemoData(data, pageTranslations, isGrid) {
  return (
    data?.map((key) => {
      return {
        ...key,
        ...(!isGrid && { Accounts: key.login_id && <TCa>{key.login_id}</TCa> }),
        ...(isGrid && { Accounts: key.login_id && <TCt>{key.login_id}</TCt> }),
        Platform: key.platform && <TCp>{mappedPlatforms[key.platform]}</TCp>,
        AccType: key.account_type && (
          <TCp style={{ textTransform: "uppercase" }}>
            {mappedAccountTypes[key.account_type] || key.account_type}
          </TCp>
        ),
        ...(isGrid && { Server: key.server && <TCt>{key.server}</TCt> }),
        Opend: formatDate(key.createdAt),
        ...(!isGrid && { Currency: key.currency }),
        ...(isGrid && {
          Currency: (key.currency == "BTC" && (
            <TCi>
              <FaBtc size={30} />
            </TCi>
          )) ||
            (key.currency == "ETH" && (
              <TCi>
                <FaEthereum size={30} />
              </TCi>
            )) || (
              <TCi>
                <SVGFlag
                  country={key.currency.slice(0, 2).toLowerCase()}
                  flagWidth="160"
                />
              </TCi>
            ),
        }),
        Leverage: key.leverage && `1:${key.leverage}`,
        Balance:
          key.balance &&
          key.currency &&
          formatCurrency(key.balance, key.currency),
        Equity:
          key.equity &&
          key.currency &&
          formatCurrency(key.equity, key.currency),

        ...(!isGrid && {
          Actions: (
            <Tooltip
              useOnClickInstead
              bgColor={theme.colors.mainWhite}
              position="bottom"
              content={
                <AccountActions
                  account={key}
                  isDemo={true}
                  pageTranslations={pageTranslations}
                />
              }
            >
              <CiCircleMore size={20} style={{ cursor: "pointer" }} />
            </Tooltip>
          ),
        }),
        ...(isGrid && {
          Actions: (
            <Tooltip
              useOnClickInstead
              bgColor={theme.colors.mainWhite}
              position="bottom"
              content={
                <AccountActions
                  account={key}
                  isDemo={true}
                  pageTranslations={pageTranslations}
                />
              }
            >
              <BsFillGearFill size={20} style={{ cursor: "pointer" }} />
            </Tooltip>
          ),
        }),
      };
    }) || []
  );
}

export function formatArchivedData(data, pageTranslations, isGrid) {
  return (
    data?.map((key) => {
      return {
        ...key,
        ...(!isGrid && { Accounts: key.login_id && <TCa>{key.login_id}</TCa> }),
        ...(isGrid && { Accounts: key.login_id && <TCt>{key.login_id}</TCt> }),
        Platform: key.platform && <TCp>{mappedPlatforms[key.platform]}</TCp>,
        AccType: key.account_type && (
          <TCp style={{ textTransform: "uppercase" }}>
            {mappedAccountTypes[key.account_type] || key.account_type}
          </TCp>
        ),
        Opend: formatDate(key.createdAt),
        Closed: formatDate(key.updatedAt),
        ...(!isGrid && { Currency: key.currency }),
        ...(isGrid && {
          Currency: (key.currency == "BTC" && (
            <TCi>
              <FaBtc size={30} />
            </TCi>
          )) ||
            (key.currency == "ETH" && (
              <TCi>
                <FaEthereum size={30} />
              </TCi>
            )) || (
              <TCi>
                <SVGFlag
                  country={key.currency.slice(0, 2).toLowerCase()}
                  flagWidth="160"
                />
              </TCi>
            ),
        }),
        Leverage: key.leverage && `1:${key.leverage}`,
        Balance:
          key.balance &&
          key.currency &&
          formatCurrency(key.balance, key.currency),
        Equity:
          key.equity &&
          key.currency &&
          formatCurrency(key.equity, key.currency),
      };
    }) || []
  );
}

function calculateOpenProfit({
  volume,
  openPrice,
  action,
  symbol,
  priceFeed,
  accountCurrency,
}) {
  let price = priceFeed?.find((p) => p.name === symbol);
  let isForex = FOREX_SYMBOLS.indexOf(symbol) >= 0;
  if (!price) return {};
  let closePrice = (action === "BUY" ? price.bid : price.ask) * 10 ** -5;
  let profit =
    (closePrice - openPrice) *
    (parseInt(volume) * 0.01) *
    (action === "BUY" ? 1 : -1);
  // if symbol is forex and accoun  tCurrency then no need to convert
  if (isForex) {
    let accCurrIdx = symbol.indexOf(accountCurrency);
    if (accCurrIdx === 0) {
      return { profit: profit / closePrice, currency: accountCurrency };
    } else if (accCurrIdx > 0) {
      return { profit, currency: accountCurrency };
    }
  }
  // Convert from SYMBOL to USD
  let conversionSymbol = FOREX_SYMBOLS_USD_CONVERSIONS[symbol];
  if (conversionSymbol) {
    let priceConv = priceFeed?.find((p) => p.name === conversionSymbol);
    if (!priceConv) return { profit, currency: symbol.substring(3) };
    let closePriceConv =
      (action === "BUY" ? priceConv.bid : priceConv.ask) * 10 ** -5;
    closePriceConv =
      conversionSymbol.indexOf("USD") === 0
        ? 1 / closePriceConv
        : closePriceConv;
    profit = profit * closePriceConv;
  }

  // Convert from USD to accountCurrency
  if (accountCurrency === "USD") return { profit, currency: accountCurrency };

  let accountConversionSymbol = USD_SYMBOLS.find((s) =>
    s.includes(accountCurrency)
  );
  if (accountConversionSymbol) {
    let accountConversionPrice = priceFeed?.find(
      (p) => p.name === accountConversionSymbol
    );
    if (accountConversionPrice) {
      let accountConversionPriceClose =
        (action === "BUY"
          ? accountConversionPrice.bid
          : accountConversionPrice.ask) *
        10 ** -5;
      accountConversionPriceClose =
        accountConversionSymbol.indexOf("USD") !== 0
          ? 1 / accountConversionPriceClose
          : accountConversionPriceClose;
      profit = profit * accountConversionPriceClose;
      return { profit, currency: accountCurrency };
    }
  }

  // let currencyConversion = priceFeed?.find()
  console.log("HERE", profit);
  return { profit, currency: "USD" };
}

export const formatClosedData = (data) =>
  data?.map((key) => {
    return {
      ...key,
      Ticket: <TCa>{key.positionId}</TCa>,
      Symbol: <TCp>{key.symbol}</TCp>,
      Action: <TCp>{key.action}</TCp>,
      Opend: <>{formatDate(key.openTime)}</>,
      Closed: <>{formatDate(key.closeTime || 1674882132)}</>,
      OpenPrice: <>{key.openPrice}</>,
      ClosedPrice: <>{key.closePrice}</>,
      Profit: (
        <Profit isPositive={parseFloat(key.netProfit) > 0}>
          {key.netProfit}
        </Profit>
      ),
    };
  }) || [];

export const formaOpenTData = (data, priceFeed = [], account) =>
  data?.map((key) => {
    let { profit, currency } = calculateOpenProfit({
      volume: key.volume,
      action: key.action,
      leverage: account?.leverage,
      openPrice: key.openPrice,
      priceFeed,
      symbol: key.symbol,
      accountCurrency: account?.currency,
    });
    return {
      ...key,
      Ticket: <TCa>{key.positionId}</TCa>,
      Symbol: <TCp>{key.symbol}</TCp>,
      Action: <TCp>{key.action}</TCp>,
      Opend: <>{formatDate(key.openTime)}</>,
      OpenPrice: <>{key.openPrice}</>,
      ClosedPrice: <>{key.closePrice}</>,
      Profit: <>{key.netProfit}</>,
      Swaps: <> {key.swap}</>,
      Commissions: <>{key.commission}</>,
      Profit: (
        <ProfitStyle profit={profit}>
          &asymp;{" "}
          {profit?.toFixed(CRYPTO_CURRENCIES.includes(currency) ? 8 : 2)}{" "}
          {currency}
        </ProfitStyle>
      ),
    };
  }) || [];

export const formatTransactionData = (data, typesMap) => {
  const intent = {
    payment: "From",
    withdrawal: "To",
  };

  const statusIcons = {
    approved: (
      <MdOutlineDone
        className="ico-center"
        size={12}
        color={theme.colors.primaryColorGreen}
      />
    ),
    rejected: (
      <IoMdClose
        className="ico-center"
        size={12}
        color={theme.colors.primaryRed}
      />
    ),
    pending: (
      <MdOutlinePending
        className="ico-center"
        size={12}
        color={theme.colors.pending}
      />
    ),
  };

  return (
    data?.map((key, idx) => {
      if (key.updatedAt) {
        key.Date = (
          <TCt width={"50%"} fweight={"400"}>
            {formatDate(key.updatedAt)}
          </TCt>
        );
      }
      if (key.transaction_type) {
        key.Type = (
          <TCt
            style={{ textTransform: "capitalize" }}
            colors={
              key.transaction_type.includes("deposit")
                ? theme.colors.primaryBlue
                : theme.colors.primaryRed
            }
          >
            {typesMap[key.transaction_type]}
          </TCt>
        );
      }
      if (key.variable1 || key.transferAccount) {
        key.Details = (
          <TCt fweight={"400"}>
            {key.variable1 ||
              `${intent[key.intent]} ${key.transferAccount?.login_id}`}
          </TCt>
        );
      }
      if (key.transaction_status) {
        key.Status = (
          <TCs
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              textTransform: "capitalize",
            }}
          >
            {statusIcons[key.transaction_status]}
            {key.transaction_status}
          </TCs>
        );
      }
      if (key.currency) {
        key.Currency = <TCt fweight={"400"}>{key.currency}</TCt>;
      }
      if (key.amount) {
        key.Amount = (
          <TCt
            colors={
              key.transaction_type.includes("deposit")
                ? theme.colors.primaryBlue
                : theme.colors.primaryRed
            }
            fweight={"400"}
          >
            {(+key.amount)?.toFixed(2)}
          </TCt>
        );
      }
      return key;
    }) || []
  );
};
