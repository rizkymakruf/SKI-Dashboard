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

import { useEffect, useState, useRef } from "react";

const CoinPriceChart = (props) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Nov",
      "Okt",
      "Des",
    ],
    datasets: [
      {
        data: [100, 200, 300, 250, 500, 400, 700, 150, 230, 300, 310, 300],
      },
    ],
  };

  return (
    <div className="chart-container w-full h-full relative">
      <Chart type="line" data={data} options={ConfigLine} />
    </div>
  );
};

export default CoinPriceChart;
