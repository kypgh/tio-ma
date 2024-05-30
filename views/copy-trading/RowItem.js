import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import OneLineText from "@/components/OneLineText";
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
import { useWindowSize } from "usehooks-ts";
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
  background-color: ${theme.colors.mainWhite};
  padding: 10px 20px;
  border-radius: 5px;
`;

const Outer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
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
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 80px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  max-width: 20%;
  width: 100%;

  & > p {
    font-size: 12px;
  }

  & > span {
    font-size: 16px;
    color: ${({ isRed }) => (isRed ? "red" : "green")};
  }

  @media (max-width: 991px) {
    max-width: 33%;
  }
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

const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = day + "/" + month;
  return output;
};

const RowItem = ({ data = {} }) => {
  const currencyFormatter = (value, currency) => {
    let formattedValue = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency,
    }).format(value);

    return formattedValue;
  };

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

  return (
    <Outest>
      <Outer>
        {isDesktop && (
          <Icon>
            {!!data?.public?.avatarPath ? (
              <Image
                src={data?.public?.avatarPath}
                width={50}
                height={50}
                alt="User Icon"
              />
            ) : (
              <FaUserTie size={45} color="#7f7f7f" />
            )}
          </Icon>
        )}
        <Name>
          <OneLineText>{data?.accountName}</OneLineText>
        </Name>
        {isDesktop && (
          <ChartContainer>
            {data && (
              <Line
                data={stepChart}
                options={options}
                width={200}
                height={80}
              />
            )}
          </ChartContainer>
        )}
        <StatsContainer>
          {/* <Stat isRed={data?.extension?.defaultRankingPoints < 0}>
            <p>Rating</p>
            <span>
              {
                // calculateRating(
                //   data.returnAllTime,
                //   data.sharpeRatio,
                //   data.maxDrawdown
                // )
                data?.extension?.defaultRankingPoints || "-"
              }
            </span>
          </Stat> */}
          <Stat isRed={data?.totalProfit < 0}>
            <p>Total Profit</p>
            <span>
              {currencyFormatter(
                data?.totalProfit || 0,
                data?.account?.currency
              )}
            </span>
          </Stat>
          <Stat isRed={data?.maxProfit < 0}>
            <p>Max Profit</p>
            <span>{data?.maxProfit || "0"}%</span>
          </Stat>
          <Stat isRed={data?.maxDrawdown < 0}>
            <p>Max Drawdown</p>
            <span>{data?.maxDrawdown || "0"}%</span>
          </Stat>
          <Stat isRed={data?.account?.equity < 0}>
            <p>Equity</p>
            <span>
              {currencyFormatter(
                data?.account?.equity,
                data?.account.currency
              ) || "-"}
            </span>
          </Stat>
          <Stat isRed={data?.returnYear < 0}>
            <p>Return (1Y)</p>
            <span>{data?.returnYear || `${data?.returnAllTime}%`}</span>
          </Stat>
          <Stat isRed={data?.returnHalfYear < 0}>
            <p>Return (6M)</p>
            <span>{data?.returnHalfYear || `${data?.returnAllTime}%`}</span>
          </Stat>
          <Stat isRed={data?.returnQuarter < 0}>
            <p>Return (3M)</p>
            <span>{data?.returnQuarter || `${data?.returnAllTime}%`}</span>
          </Stat>
          <Stat isRed={data?.sharpeRatio < 0}>
            <p>Sharpe Ratio</p>
            <span>{data?.sharpeRatio || "0.00"}</span>
          </Stat>
          <Stat isRed={data?.account?.balance < 0}>
            <p>Balance</p>
            <span style={{ color: theme.colors.mainBlack }}>
              {currencyFormatter(
                data?.account?.balance,
                data?.account.currency
              ) || "-"}
            </span>
          </Stat>
          {!isDesktop && (
            <OranjBtn
              href={`https://social-mt5.tiomarkets.com/portal/registration/subscription?provider=${data.profileId}&backLink=true&backUrl=https:%2F%2Fratings-mt5.tiomarkets.com&lang=en&wlid=4b8ff8fe-d35e-4cd9-8caf-113717230ca5`}
              target="_blank"
            >
              COPY
            </OranjBtn>
          )}
        </StatsContainer>
        {isDesktop && (
          <OranjBtn
            href={`https://social-mt5.tiomarkets.com/portal/registration/subscription?provider=${data.profileId}&backLink=true&backUrl=https:%2F%2Fratings-mt5.tiomarkets.com&lang=en&wlid=4b8ff8fe-d35e-4cd9-8caf-113717230ca5`}
            target="_blank"
          >
            COPY
          </OranjBtn>
        )}
      </Outer>
    </Outest>
  );
};

export default RowItem;
