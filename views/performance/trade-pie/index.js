import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { theme } from "../../../styles/theme";

export default function TradePie() {
  const [chartOptions, setChartOptions] = useState({});
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    setChartData({
      //labels: ["EURUSD", "GBPUSD", "USDCAD", "AUDUSD", "USDCHF"],
      labels: ["USDCHF", "AUDUSD", "USDCAD", "GBPUSD", "EURUSD"],

      datasets: [
        {
          //data: [50, 19, 17, 8, 6],
          data: [6, 8, 19, 17, 50],
          backgroundColor: [
            theme.colors.usdchf,
            theme.colors.audusd,
            theme.colors.usdcad,
            theme.colors.gbpusd,
            theme.colors.eurusd,
          ],
          borderWidth: 0,
          hoverBorderWidth: 3,
        },
      ],
    });
    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
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
                text: `${chart.data.labels[i]} : ${data}%`,
                fillStyle: datasets[0].backgroundColor[i],
                index: i,
              }));
            },
          },
          reverse: true,
        },
      },
    });
  }, []);

  return <Pie options={chartOptions} data={chartData} />;
}
