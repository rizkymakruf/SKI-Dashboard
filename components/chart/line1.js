import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

import { ConfigLine } from "components/chart/chartConfig";

import { useEffect, useState, useRef } from "react";

const CoinPriceChart = (props) => {
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
        data: props.qty,
      },
    ],
  };
  console.log("data", data);
  return (
    <div className="chart-container w-full h-full relative">
      <Chart type="line" data={data} options={ConfigLine} />
    </div>
  );
};

export default CoinPriceChart;
