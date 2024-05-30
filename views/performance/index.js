import moment from "moment";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import AccountDetailsLabel from "../../components/AccountDetailsLabel";
import AccountSelect from "../../components/AccountSelect";
import Mcontainer from "../../components/Mcontainer";
import { TitleH2 } from "../../components/Typography";
import { RightContainer } from "../../styles/sharedstyles";
import { theme } from "../../styles/theme";
import { getCurrencyDigits } from "../../utils/functions";
import { useGetAccountDemographics } from "../../utils/hooks/queryHooks";
import useUserFlags from "../../utils/hooks/useUserFlags";
import {
  AccountDetails,
  AccountDetailsCol4,
  AccountDetailsRow,
} from "./perfomance.styles";

function _txtFormatPercentage(value) {
  return `${value ? value.toFixed(1) : "0"}%`;
}

function _txtFormatCurrency(value, currency) {
  let digits = getCurrencyDigits(currency);
  return `${value ? parseFloat(value).toFixed(digits) : "0"} ${
    currency ?? "USD"
  }`;
}

function _humanizeDuration(value) {
  let dur = moment.duration(value ?? 0, "milliseconds");
  const result = [
    dur.asYears().toFixed(0) + " years",
    (dur.asDays() % 365).toFixed(0) + " days",
    (dur.asHours() % 24).toFixed(0) + " hours",
    (dur.asMinutes() % 60).toFixed(0) + " minutes",
    (dur.asSeconds() % 60).toFixed(0) + " seconds",
  ]
    .filter((item) => parseInt(item) > 0)
    .join(", ");

  return result ? result : "0 seconds";
}

export default function Performance({ pageTranslations, genericTranslations }) {
  const router = useRouter();
  const selectedAccount = router.query.accountId || "";
  const setSelectedAccount = (v) =>
    router.push(
      {
        query: { ...router.query, accountId: v },
      },
      null,
      { shallow: true }
    );

  const { data } = useGetAccountDemographics(selectedAccount, {
    enabled: !!selectedAccount,
  });

  useEffect(() => {
    setSelectedAccount(router.query.account || "");
  }, [router.query.account]);

  let dur = moment.duration(data?.avgOrderDuration, "milliseconds");
  let averageDurationHumanize = [
    dur.asYears() + " years",
    dur.asDays() + " days",
    dur.asHours() + " hours",
    dur.asMinutes() + " minutes",
    dur.asSeconds() + " seconds",
  ]
    .filter((item) => parseInt(item) > 0)
    .join(", ");

  const {
    accountLabel,
    overviewAccount,
    accountDetailsTitle,
    tradesDistributionTitle,
    statisticsTitle,
    accountDetailsLabel,
    balanceLabel,
    equityLabel,
    marginLabel,
    createdLabel,
    totalWithdrawalsLabel,
    freeMarginLabel,
    marginLevelLabel,
    volumeLabel,
    totalDepositsLabel,
    closedLabel,
    openLabel,
    totalTradesLabel,
    profitabilityLabel,
    pointsLabel,
    averageWinLabel,
    averageLossLabel,
    avgOrderDurationLabel,
    profitableLongTradesLabel,
    profitableShortTradesLabel,
    bestTradeLabel,
    worstTradeLabel,
    bestTradePointsLabel,
    worstTradePointsLabel,
    profitFactorLabel,
    recoveryFactorLabel,
    expectancyLabel,
    dontHaveAccount,
    openLiveAccount,
  } = pageTranslations;

  const { plsSelect } = genericTranslations;

  const { isEmailVerified } = useUserFlags();
  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlider /> */}

        <Mcontainer bxshadow={theme.colors.primaryBoxShadow} pall={"25px 35px"}>
          <AccountSelect
            label={accountLabel}
            optionsLabel={plsSelect}
            onChange={(val) => {
              setSelectedAccount(val._id);
            }}
            enviroment="live"
            width={"300px"}
            value={selectedAccount}
          />
          {isEmailVerified && (
            <AccountDetails>
              <TitleH2
                fweight={"500"}
                fsize={"20px"}
                lheight={"24px"}
                mt={"30px"}
                pb={"15px"}
                mb={"0px"}
                txtcolor={theme.colors.secondaryDarkGray}
              >
                <MdOutlineAccountBalanceWallet size={20} />
                {accountDetailsTitle}
              </TitleH2>
              <AccountDetailsRow>
                <AccountDetailsCol4>
                  <AccountDetailsLabel
                    label={accountDetailsLabel}
                    txt={data?.accountId ?? "--"}
                  />
                  <AccountDetailsLabel
                    label={balanceLabel}
                    txt={_txtFormatCurrency(
                      data?.balance,
                      data?.accountCurrency
                    )}
                  />
                  <AccountDetailsLabel
                    label={equityLabel}
                    txt={_txtFormatCurrency(
                      data?.equity,
                      data?.accountCurrency
                    )}
                  />
                  <AccountDetailsLabel
                    label={marginLabel}
                    txt={_txtFormatCurrency(
                      data?.margin,
                      data?.accountCurrency
                    )}
                  />
                </AccountDetailsCol4>

                <AccountDetailsCol4>
                  <AccountDetailsLabel
                    label={createdLabel}
                    txt={
                      data?.createdAt
                        ? moment(data?.createdAt).format("DD MMM YYYY")
                        : "--"
                    }
                  />
                  <AccountDetailsLabel
                    label={freeMarginLabel}
                    txt={_txtFormatCurrency(
                      data?.freeMargin,
                      data?.accountCurrency
                    )}
                  />
                  <AccountDetailsLabel
                    label={marginLevelLabel}
                    txt={_txtFormatPercentage(data?.marginLevel)}
                  />
                  <AccountDetailsLabel
                    label={volumeLabel}
                    txt={data?.volume ?? 0}
                  />
                </AccountDetailsCol4>

                <AccountDetailsCol4>
                  <AccountDetailsLabel
                    label={totalDepositsLabel}
                    txt={_txtFormatCurrency(
                      data?.totalDeposits,
                      data?.accountCurrency
                    )}
                  />
                  <AccountDetailsLabel
                    label={totalWithdrawalsLabel}
                    txt={_txtFormatCurrency(
                      data?.totalWithdrawals,
                      data?.accountCurrency
                    )}
                  />
                  <AccountDetailsLabel
                    label={closedLabel}
                    txt={_txtFormatCurrency(data?.totalProfit, "USD")}
                  />
                  <AccountDetailsLabel
                    label={openLabel}
                    txt={_txtFormatCurrency(data?.openPl, "USD")}
                  />
                </AccountDetailsCol4>
              </AccountDetailsRow>

              <TitleH2
                fweight={"500"}
                fsize={"20px"}
                lheight={"24px"}
                mt={"30px"}
                pb={"15px"}
                mb={"0px"}
                txtcolor={theme.colors.secondaryDarkGray}
              >
                <BsGraphUp size={16} />
                {statisticsTitle}
              </TitleH2>
              <AccountDetailsRow>
                <AccountDetailsCol4>
                  <AccountDetailsLabel
                    label={totalTradesLabel}
                    txt={data?.totalTrades ?? 0}
                  />
                  <AccountDetailsLabel
                    label={profitabilityLabel}
                    txt={_txtFormatPercentage(data?.profitability)}
                  />
                  <AccountDetailsLabel
                    label={pointsLabel}
                    txt={data?.points ?? 0}
                  />
                  <AccountDetailsLabel
                    label={averageWinLabel}
                    txt={_txtFormatCurrency(data?.averageWins, "USD")}
                  />
                  <AccountDetailsLabel
                    label={averageLossLabel}
                    txt={_txtFormatCurrency(data?.averageLoss, "USD")}
                  />
                </AccountDetailsCol4>

                <AccountDetailsCol4>
                  <AccountDetailsLabel
                    label={avgOrderDurationLabel}
                    txt={_humanizeDuration(data?.avgOrderDuration)}
                  />
                  <AccountDetailsLabel
                    label={profitableLongTradesLabel}
                    txt={_txtFormatPercentage(
                      data?.profitableLongTradesPercent
                    )}
                  />
                  <AccountDetailsLabel
                    label={profitableShortTradesLabel}
                    txt={_txtFormatPercentage(
                      data?.profitableShortTradesPercent
                    )}
                  />
                  <AccountDetailsLabel
                    label={bestTradeLabel}
                    txt={_txtFormatCurrency(data?.bestTrade, "USD")}
                  />
                  <AccountDetailsLabel
                    label={worstTradeLabel}
                    txt={_txtFormatCurrency(data?.worstTrade, "USD")}
                  />
                </AccountDetailsCol4>

                <AccountDetailsCol4>
                  <AccountDetailsLabel
                    label={bestTradePointsLabel}
                    txt={data?.bestPoints ?? 0}
                  />
                  <AccountDetailsLabel
                    label={worstTradePointsLabel}
                    txt={data?.wortsPoints ?? 0}
                  />
                  <AccountDetailsLabel
                    label={profitFactorLabel}
                    txt={_txtFormatCurrency(data?.profitFactor, "USD")}
                  />
                  {/* <AccountDetailsLabel label={recoveryFactorLabel} txt="0" /> */}
                  <AccountDetailsLabel
                    label={expectancyLabel}
                    txt={_txtFormatPercentage(data?.expectancy)}
                  />
                </AccountDetailsCol4>
              </AccountDetailsRow>
            </AccountDetails>
          )}
        </Mcontainer>
      </RightContainer>
    </>
  );
}
