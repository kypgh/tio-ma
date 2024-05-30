import React from "react";
import { Pie, PolarArea } from "react-chartjs-2";
import { theme } from "../../styles/theme";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  RadialLinearScale,
} from "chart.js";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const TradesDistribution = ({
  percentages,
  options = {},
  data = {},
  genericTranslations,
}) => {
  const { forex, indices, stocks, commodities, crypto, other } =
    genericTranslations;

  return (
    <PolarArea
      options={{
        maintainAspectRatio: false,
        responsive: true,
        circular: true,

        scales: {
          r: {
            backgroundColor: "rgba(248,248,248)",
            beginAtZero: true,
            ticks: {
              z: 2,
              backdropColor: "rgba(248,248,248,0)",
              font: {
                size: 10,
                weight: 900,
              },
              color: [theme.colors.darkGrayishBlue],
              // display: false,
            },
            grid: {
              // display: false,
              color: "rgb(255 255 255)",
              lineWidth: 2,
            },
          },
        },

        legend: {
          display: false,
        },
        plugins: {
          legend: {
            position: "right",
            onClick: "hidden",

            labels: {
              usePointStyle: true,
              padding: 28,
              color: [theme.colors.darkGrayishBlue],
              font: {
                size: 11,
                weight: 700,
                lineHeight: 13,
              },
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                return datasets[0].data.map((data, i) => ({
                  text: `${chart.data.labels[i]}: ${data}%`,
                  fillStyle: datasets[0].backgroundColor[i],
                  index: i,
                }));
              },
            },
            reverse: false,
          },

          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.formattedValue}%`;
              },
            },
          },
        },
      }}
      data={{
        labels: [forex, indices, stocks, crypto, commodities, other],

        datasets: [
          {
            data: [
              percentages?.forex ? percentages?.forex.percentage : 0,
              percentages?.indices ? percentages?.indices.percentage : 0,
              percentages?.stocks ? percentages?.stocks.percentage : 0,
              percentages?.crypto ? percentages?.crypto.percentage : 0,
              percentages?.commodities
                ? percentages?.commodities.percentage
                : 0,
              percentages?.other ? percentages?.other.percentage : 0,
            ],
            // data: [6, 8, 19, 17, 50],
            backgroundColor: [
              theme.colors.forex,
              theme.colors.indices,
              theme.colors.stocks,
              theme.colors.crypto,
              theme.colors.energies,
              theme.colors.metals,
            ],
            borderWidth: 2,
            hoverBorderWidth: 3,
          },
        ],
      }}
    />
  );
};

export default TradesDistribution;
