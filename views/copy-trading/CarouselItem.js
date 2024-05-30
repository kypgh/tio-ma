import React, { useEffect, useRef, useState, forwardRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import Link from "next/link";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import OneLineText from "@/components/OneLineText";
import { useWindowSize } from "usehooks-ts";
import TooltipWrapper from "./TooltipWrapper";
import { DateTime } from "luxon";
import { theme } from "@/styles/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Outest = styled.div`
  flex: 0 0 auto;
  width: calc(100% / 5);
  padding: 0 5px;

  @media (max-width: 1180px) {
    width: calc(100% / 4);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Outer = styled.div`
  border-radius: 7px;
  /* overflow: hidden; */
  border: 1px solid #d4d4d4;
`;

const TopRow = styled.div`
  background-color: #f4f4f4;
`;

const TopInner = styled.div`
  display: flex;
  gap: 10px;
  min-height: 75px;
  padding: 10px;
  & img {
    border-radius: 50%;
  }

  @media (max-width: 991px) {
    padding: 5px;
  }
`;

const Icon = styled.div`
  border-radius: 50%;
  overflow: hidden;
  min-height: 50px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    min-height: 35px;
    min-width: 35px;
  }
`;

const TitleContainer = styled.div`
  /* width: 100%; */
  & > h3 {
    font-size: 18px;
    text-transform: capitalize;

    line-height: 1.2em;
    height: 1.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  @media (max-width: 991px) {
    & > h3 {
      font-size: 16px;
    }
  }
`;

const BoxStat = styled.div`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${({ isRed }) => (isRed ? "red" : "green")};
  background-color: ${theme.colors.mainWhite};
  color: ${({ isRed }) => (isRed ? "red" : "green")};
  text-align: center;
  max-width: 130px;

  @media (max-width: 991px) {
    font-size: 14px;
    max-width: 100px;
  }
`;

const Inner = styled.div`
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin: 5px;
`;

const StatsContainer = styled.div`
  padding: 5px;
`;

const Stats = styled.div`
  border: 1px solid #dcdcdc73;
  display: flex;
  padding: 5px;
  gap: 9px;

  & + & {
    border-top: none;
  }
`;

const Half = styled.div`
  width: 50%;

  & p {
    font-size: 13px;
  }
`;

const Color = styled.p`
  color: ${({ isRed }) => (isRed ? "#FF0000" : "#59B56C")};
  font-size: 14px;
`;

const OranjBtn = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  padding: 3px 10px;
  max-width: 120px;
  width: 100%;
  border-radius: 7px;
  border: 2px solid ${theme.colors.primaryColor};
  color: ${theme.colors.mainWhite};
  background-color: ${theme.colors.primaryColor};
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin: 10px auto;

  &:hover {
    background-color: transparent;
    color: ${theme.colors.primaryColor};
  }
`;

function dateFormatter(dateString) {
  const date = DateTime.fromISO(dateString);
  return date.toFormat("dd-LL-yyyy");
}

const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = day + "/" + month;
  return output;
};

const CarouselItem = forwardRef(({ data = {} }, ref) => {
  let dd = data?.history?.entries?.map((el) => formatDate(el.tp));
  let ld = data?.history?.entries?.map((el) => el.rt);

  const stepChart = {
    labels: dd.splice(dd.length - 30, 30),
    datasets: [
      {
        data: ld.splice(ld.length - 30, 30),
        borderColor: theme.colors.primaryColor,
        backgroundColor: "rgba(253, 122, 35, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    pointRadius: 0.4,
    plugins: {
      legend: false,
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  };

  const [isDesktop, setIsDesktop] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    setIsDesktop(width > 991);
  }, [width]);

  const currencyFormatter = (value, currency) => {
    let formattedValue = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency,
    }).format(value);

    return formattedValue;
  };

  return (
    <Outest ref={ref}>
      <Outer>
        <TopRow>
          <TopInner>
            <Icon>
              {!!data?.public?.avatarPath ? (
                <Image
                  src={data?.public?.avatarPath}
                  width={isDesktop ? 50 : 35}
                  height={isDesktop ? 50 : 35}
                  alt="User Icon"
                />
              ) : (
                <FaUserTie size={isDesktop ? 45 : 35} color="#7f7f7f" />
              )}
            </Icon>
            <TitleContainer>
              <OneLineText>{data?.accountName}</OneLineText>
              <BoxStat
                isRed={data?.returnAllTime < 0}
              >{`ROI ${data?.returnAllTime}%`}</BoxStat>
            </TitleContainer>
          </TopInner>
          <Stats>
            <Half style={{ textAlign: "center" }}>
              <p style={{ fontSize: "14px" }}>First Trade</p>
              <Color
                style={{ color: "black", fontWeight: 600, fontSize: "12px" }}
              >
                {dateFormatter(data?.history?.entries[0]?.tp?.split("T")[0])}
              </Color>
            </Half>
            <Half style={{ textAlign: "center" }}>
              <p style={{ fontSize: "14px" }}>Last Trade</p>
              <Color
                style={{ color: "black", fontWeight: 600, fontSize: "12px" }}
              >
                {dateFormatter(
                  data?.history?.entries[
                    data?.history?.entries?.length - 1
                  ]?.tp?.split("T")[0]
                ) || "-"}
              </Color>
            </Half>
          </Stats>
        </TopRow>
        <Inner>{data && <Line data={stepChart} options={options} />}</Inner>
        <StatsContainer>
          <Stats>
            {/* <Half>
              <TooltipWrapper tooltip="Account's rating points">
                <p>Rating</p>
                <Color isRed={data?.extension?.defaultRankingPoints < 0}>
                  {

                    data?.extension?.defaultRankingPoints || "-"
                  }
                </Color>
              </TooltipWrapper>
            </Half> */}
          </Stats>
          <Stats>
            <Half>
              <TooltipWrapper tooltip="The time-weighted return of the account for the current year. The indicator shows the percentage gains of the assets and is designed to exclude the impact of deposit/withdrawal operations mid-period. Time-weighted return is well-regarded as the best indicator to benchmark the profitability of a trading strategy.">
                <p>Return (1Y)</p>
                <Color isRed={data?.returnYear < 0}>
                  {data?.returnYear || `${data?.returnAllTime}%`}
                </Color>
              </TooltipWrapper>
            </Half>
            <Half>
              <TooltipWrapper tooltip="Overall gross PnL of an account.">
                <p>Total profit</p>
                <Color isRed={data?.totalProfit < 0}>
                  {currencyFormatter(
                    data?.totalProfit || 0,
                    data?.account?.currency
                  )}
                </Color>
              </TooltipWrapper>
            </Half>
          </Stats>
          <Stats>
            <Half>
              <TooltipWrapper tooltip="The time-weighted return of the account for the last 6 months. The indicator shows the percentage gains of the assets and is designed to exclude the impact of deposit/withdrawal operations mid-period. Time-weighted return is well-regarded as the best indicator to benchmark the profitability of a trading strategy.">
                <p>Return (6M)</p>
                <Color isRed={data?.returnHalfYear < 0}>
                  {data?.returnHalfYear || `${data?.returnAllTime}%`}
                </Color>
              </TooltipWrapper>
            </Half>
            <Half>
              <TooltipWrapper tooltip="The maximum positive return, the account had achieved from profits during a single uninterrupted interval">
                <p>Max profit</p>
                <Color isRed={data?.maxProfit < 0}>
                  {data?.maxProfit || "0"}%
                </Color>
              </TooltipWrapper>
            </Half>
          </Stats>
          <Stats>
            <Half>
              <TooltipWrapper tooltip="The time-weighted return of the account for the current quarter of the year. The indicator shows the percentage gains of the assets and is designed to exclude the impact of deposit/withdrawal operations mid-period. Time-weighted return is well-regarded as the best indicator to benchmark the profitability of a trading strategy.">
                <p>Return (3M)</p>
                <Color isRed={data?.returnQuarter < 0}>
                  {data?.returnQuarter || `${data?.returnAllTime}%`}
                </Color>
              </TooltipWrapper>
            </Half>
            <Half>
              <TooltipWrapper tooltip="The maximum realized decline in value from peak to trough over the lifetime of the trading account.">
                <p>Max drawdown</p>
                <Color isRed={data?.maxDrawdown < 0}>
                  {data?.maxDrawdown || "0"}%
                </Color>
              </TooltipWrapper>
            </Half>
          </Stats>
          <Stats>
            <Half>
              <TooltipWrapper tooltip="The ratio of return to risk. The indicator helps by adjusting an average daily return by historic volatility between the same returns. When comparing the two strategies with the similar daily return, the lower ratio suggests that the return was gained because of high market volatility, rather than investing skill.">
                <p>Sharpe ratio</p>
                <Color isRed={data?.sharpeRatio < 0}>
                  {data?.sharpeRatio || "0.00"}
                </Color>
              </TooltipWrapper>
            </Half>
            <Half>
              <TooltipWrapper tooltip="The current equity of the account in the trading platform">
                <p>Equity</p>
                <Color isRed={data?.account?.equity < 0}>
                  {currencyFormatter(
                    data?.account?.equity,
                    data?.account.currency
                  ) || "-"}
                </Color>
              </TooltipWrapper>
            </Half>
          </Stats>
          <Stats>
            <Half>
              <TooltipWrapper tooltip="The current balance of the account in the trading platform">
                <p>Balance</p>
                <Color isRed={data?.account?.balance < 0}>
                  {currencyFormatter(
                    data?.account?.balance,
                    data?.account.currency
                  ) || "-"}
                </Color>
              </TooltipWrapper>
            </Half>
          </Stats>
          {/* <Stats>
            <Half>
              <TooltipWrapper tooltip="Account's score points">
                <p>Score</p>
                <Color isRed={data?.extension?.defaultRankingPoints < 0}>
                  {calcNomralizedValues({
                    age: normalize(data.age, age.min, age.max),
                    returnAllTime: normalize(
                      data.returnAllTime,
                      returnAllTime.min,
                      returnAllTime.max
                    ),
                    sharpeRatio: normalize(
                      data.sharpeRatio,
                      sharpeRatio.min,
                      sharpeRatio.max
                    ),
                    maxDrawdown: 1 - data.maxDrawdown / 100,
                  })}
                </Color>
              </TooltipWrapper>
            </Half>
          </Stats> */}
        </StatsContainer>

        <OranjBtn
          href={`https://social-mt5.tiomarkets.com/portal/registration/subscription?provider=${data.profileId}&backLink=true&backUrl=https:%2F%2Fratings-mt5.tiomarkets.com&lang=en&wlid=4b8ff8fe-d35e-4cd9-8caf-113717230ca5`}
          target="_blank"
        >
          COPY
        </OranjBtn>
      </Outer>
    </Outest>
  );
});

export default CarouselItem;
