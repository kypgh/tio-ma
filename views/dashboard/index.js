import React, { useMemo } from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import StatsBox from "../../components/StatsBox";
import styled from "styled-components";
import SectionRow from "../../components/SectionRow";
import { CgPerformance } from "react-icons/cg";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { theme } from "../../styles/theme";
import MarketHoursBox from "../../components/MarketHoursBox";
import TradesDistribution from "../../components/charts/TradesDistribution";
import BuySell from "../../components/charts/BuySell";
import { device } from "../../styles/device";
import {
  useGetAccountSummary,
  useGetAccountSummaryPositions,
} from "../../utils/hooks/queryHooks";
import { formatCurrency } from "../../utils/functions";
import SuccessScreen from "../../components/SuccessScreen";

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  @media ${device.tablet} {
    flex-wrap: wrap;
    align-items: stretch;
  }
`;

const MarketHoursContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;

  & > div {
    width: 100%;
    flex: 1;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px) saturate(0);
`;

const EmptyOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: ${theme.colors.mainWhite};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  font-size: 26px;
  box-shadow: 0px 0px 5px 5px #1111111f;
  border-radius: 7px;
`;

const DashboardView = ({ pageTranslations, genericTranslations }) => {
  const {
    accSummarry2,
    myPos,
    marketTHours,
    sumLabel1,
    sumInfo1,
    sumLabel2,
    sumInfo2,
    sumLabel3,
    sumInfo3,
    sumLabel4,
    sumInfo4,
    stockExchange,
    securitiesExchange,
    noTrades,
  } = pageTranslations;

  const marketHours = [
    {
      title: "London",
      timeZone: "Europe/London",
      type: stockExchange,
      hours: [
        { open: "8:00 AM", close: "12:00 PM" },
        { open: "12:02 PM", close: "4:30 PM" },
      ],
    },
    {
      title: "New York",
      timeZone: "America/New_York",
      type: stockExchange,
      hours: [{ open: "9:30 AM", close: "4:00 PM" }],
    },
    {
      title: "Tokyo",
      timeZone: "Asia/Tokyo",
      type: stockExchange,
      hours: [
        { open: "9:00 AM", close: "11:30 AM" },
        { open: "12:30 PM", close: "3:00 PM" },
      ],
    },
    {
      title: "Australia",
      timeZone: "Australia/Sydney",
      type: securitiesExchange,
      hours: [{ open: "10:00 AM", close: "04:00 PM" }],
    },
  ];

  const summaryQuery = useGetAccountSummary();
  const summaryPositionsQuery = useGetAccountSummaryPositions();
  const summary = [
    {
      stat: summaryQuery.isLoading
        ? null
        : formatCurrency(summaryQuery.data?.todaysClosedPl, "USD"),
      label: sumLabel1,
      info: sumInfo1,
      enabled: true,
    },
    {
      stat: summaryQuery.isLoading
        ? null
        : formatCurrency(summaryQuery.data?.openPl, "USD"),
      label: sumLabel2,
      info: sumInfo2,
      enabled: false,
    },
    {
      stat: summaryQuery.isLoading
        ? null
        : formatCurrency(summaryQuery.data?.freeMargin, "USD"),
      label: sumLabel3,
      info: sumInfo3,
      enabled: false,
    },
    {
      stat: summaryQuery.isLoading
        ? null
        : `${summaryQuery.data?.profitability * 100}%`,
      label: sumLabel4,
      info: sumInfo4,
      enabled: true,
    },
    {
      stat: summaryQuery.isLoading ? null : summaryQuery.data?.totalTrades,
      label: "Total Trades",
      info: "The total number of trades executed on all of your accounts.",
      enabled: true,
    },
    {
      stat: summaryQuery.isLoading
        ? null
        : formatCurrency(summaryQuery.data?.totalBalance, "USD"),
      label: "Total Balance",
      info: "The total balance of all of your accounts in USD.",
      enabled: true,
    },
  ];

  return (
    <RightContainer>
      <Mcontainer>
        <SectionRow
          title={accSummarry2}
          icon={<CgPerformance color={theme.colors.mainBlack} />}
        >
          <StatsContainer>
            {summary
              .filter((e) => e.enabled)
              .map((x, idx) => (
                <StatsBox
                  key={idx}
                  stat={x.stat}
                  label={x.label}
                  info={x.info}
                />
              ))}
          </StatsContainer>
        </SectionRow>
        <SectionRow
          title={myPos}
          icon={<AiOutlinePieChart color={theme.colors.mainBlack} />}
        >
          {!summaryPositionsQuery.isLoading && (
            <ChartsContainer>
              {Object.keys(summaryPositionsQuery?.data?.tradeData)?.length ===
                0 && <Blur />}
              {Object.keys(summaryPositionsQuery?.data?.tradeData)?.length ===
                0 && (
                <EmptyOverlay>
                  <strong>{noTrades}</strong>
                </EmptyOverlay>
              )}
              <div>
                <TradesDistribution
                  genericTranslations={genericTranslations}
                  percentages={
                    summaryPositionsQuery.data
                      ? summaryPositionsQuery.data.tradeData
                      : []
                  }
                />
              </div>
              <div>
                <BuySell
                  genericTranslations={genericTranslations}
                  percentages={
                    summaryPositionsQuery.data
                      ? summaryPositionsQuery.data.tradeData
                      : []
                  }
                />
              </div>
            </ChartsContainer>
          )}
        </SectionRow>
        <SectionRow
          title={marketTHours}
          icon={<BsGlobe color={theme.colors.mainBlack} />}
        >
          <MarketHoursContainer>
            {marketHours.map((x, idx) => (
              <MarketHoursBox
                key={idx}
                title={x.title}
                timeZone={x.timeZone}
                type={x.type}
                hours={x.hours}
                pageTranslations={pageTranslations}
              />
            ))}
          </MarketHoursContainer>
        </SectionRow>
      </Mcontainer>
    </RightContainer>
  );
};

export default DashboardView;
