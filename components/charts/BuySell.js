import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { theme } from "../../styles/theme";
import { invertColor, pSBC } from "../../utils/functions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BuySell = ({
  percentages,
  options = {},
  data = {},
  genericTranslations,
}) => {
  const { forex, indices, stocks, commodities, crypto, other } =
    genericTranslations;

  return (
    <Bar
      options={{
        indexAxis: "y",
        onHover() {},

        scales: {
          y: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 11,
                weight: 700,
              },
              color: [theme.colors.darkGrayishBlue],
            },
          },
          x: {
            stacked: true,
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
              font: {
                size: 11,
                weight: 400,
              },
              color: [theme.colors.secondaryBlack],
            },
            grid: {
              color: [theme.colors.mainBgColor],
              borderDash: [20, 4],
              borderColor: [theme.colors.mainBgColor],
              tickColor: [theme.colors.mainBgColor],
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label} ${context.formattedValue}%`;
              },
            },
          },
        },
      }}
      data={{
        barThickness: 25,
        maxBarThickness: 25,
        barPercentage: 0.9,
        categoryPercentage: 100,
        maintainAspectRatio: false,
        responsive: true,
        labels: [forex, indices, stocks, crypto, commodities, other],
        datasets: [
          {
            label: "BUY",
            data: [
              percentages?.forex ? percentages?.forex.percentageLong : 0,
              percentages?.indices ? percentages?.indices.percentageLong : 0,
              percentages?.stocks ? percentages?.stocks.percentageLong : 0,
              percentages?.crypto ? percentages?.crypto.percentageLong : 0,
              percentages?.commodities
                ? percentages?.commodities.percentageLong
                : 0,
              percentages?.other ? percentages?.other.percentageLong : 0,
            ],
            backgroundColor: [
              theme.colors.forex,
              theme.colors.indices,
              theme.colors.stocks,
              theme.colors.crypto,
              theme.colors.energies,
              theme.colors.metals,
            ],
          },
          {
            label: "SELL",
            data: [
              percentages?.forex ? percentages?.forex.percentageShort : 0,
              percentages?.indices ? percentages?.indices.percentageShort : 0,
              percentages?.stocks ? percentages?.stocks.percentageShort : 0,
              percentages?.crypto ? percentages?.crypto.percentageShort : 0,
              percentages?.commodities
                ? percentages?.commodities.percentageShort
                : 0,
              percentages?.other ? percentages?.other.percentageShort : 0,
            ],
            backgroundColor: [
              theme.colors.forexDark,
              theme.colors.indicesDark,
              theme.colors.stocksDark,
              theme.colors.cryptoDark,
              theme.colors.energiesDark,
              theme.colors.metalsDark,
            ],
          },
        ],
      }}
    />
  );
};

export default BuySell;
