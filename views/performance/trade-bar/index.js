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
import { theme } from "../../../styles/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TradeBar() {
  const labels = ["EURUSD", "GBPUSD", "USDCAD", "AUDUSD", "USDCHF"];

  const data = {
    barThickness: 25,
    maxBarThickness: 25,

    barPercentage: 0.9,
    categoryPercentage: 1,
    maintainAspectRatio: false,
    responsive: true,
    labels,
    datasets: [
      {
        label: "",
        borderColor: [theme.colors.usdchf],
        backgroundColor: [theme.colors.usdchf],
      },
      {
        label: "",
        borderColor: [theme.colors.audusd],
        backgroundColor: [theme.colors.audusd],
      },
      {
        label: "",
        borderColor: [theme.colors.usdcad],
        backgroundColor: [theme.colors.usdcad],
      },
      {
        label: "",
        borderColor: [theme.colors.gbpusd],
        backgroundColor: [theme.colors.gbpusd],
      },
      {
        label: "SELL",
        data: [50, 30, 20, 15, 15],
        borderColor: [
          theme.colors.eurusd,
          theme.colors.gbpusd,
          theme.colors.usdcad,
          theme.colors.audusd,
          theme.colors.usdchf,
        ],
        backgroundColor: [
          theme.colors.eurusd,
          theme.colors.gbpusd,
          theme.colors.usdcad,
          theme.colors.audusd,
          theme.colors.usdchf,
        ],
      },
      {
        label: "BUY",
        data: [100, 100, 100, 100, 100],
        borderColor: [
          theme.colors.eurusd,
          theme.colors.gbpusd,
          theme.colors.usdcad,
          theme.colors.audusd,
          theme.colors.usdchf,
        ],
        backgroundColor: [theme.colors.tertiaryDarkGray],
      },
    ],
  };
  const options = {
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
        labels: { boxWidth: 14 },
      },
    },
  };

  return <Bar options={options} data={data} />;
}
