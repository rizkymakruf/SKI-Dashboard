import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

import { ConfigLine } from "components/chart/chartConfig";

import { useEffect, useState, useRef, memo } from "react";

const CoinPriceChart = (props) => {
  // const data = {
  //   labels: [
  //     "Jan",
  //     "Feb",
  //     "March",
  //     "April",
  //     "Mei",
  //     "June",
  //     "July",
  //     "Aug",
  //     "Sept",
  //     "Nov",
  //     "Oct",
  //     "Dec",
  //   ],
  //   datasets: [
  //     {
  //       data: props.rp,
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //         "rgba(255, 205, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(153, 102, 255, 0.2)"
  //       ],
  //     },
  //   ],
  // };

  // const labels = Utils.months({ count: 12 });
  const data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "Mei",
      "June",
      "July",
      "Aug",
      "Sept",
      "Nov",
      "Oct",
      "Dec",
    ],
    datasets: [
      {
        data: props.rp,
        backgroundColor: [
          "rgba(255, 237, 187, 0.6)",
          "rgba(255, 229, 202, 0.6)",
          "rgba(255, 226, 146, 0.6)",
          "rgba(248, 169, 110, 0.6)",
          "rgba(215, 227, 125, 0.6)",
          "rgba(173, 197, 231, 0.6)",
          "rgba(248, 170, 150, 0.6)",
          "rgba(231, 186, 215, 0.6)",
          "rgba(186, 228, 240, 0.6)",
          "rgba(74, 200, 221, 0.6)",
          "rgba(245, 140, 118, 0.6)",
          "rgba(128, 107, 170, 0.6)",
        ],
        borderColor: [
          "rgba(255, 237, 187)",
          "rgba(255, 229, 202)",
          "rgba(255, 226, 146)",
          "rgba(248, 169, 110)",
          "rgba(215, 227, 125)",
          "rgba(173, 197, 231)",
          "rgba(248, 170, 150)",
          "rgba(231, 186, 215)",
          "rgba(186, 228, 240)",
          "rgba(74, 200, 221)",
          "rgba(245, 140, 118)",
          "rgba(128, 107, 170)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container w-full h-full relative">
      <Chart type="bar" data={data} options={ConfigLine} />
    </div>
  );
};

export default memo(CoinPriceChart);
