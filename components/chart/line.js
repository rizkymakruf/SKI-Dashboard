import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

import { ConfigLine } from 'components/chart/chartConfig';

import { useEffect, useState, useRef } from "react"

const CoinPriceChart = (props) => {

  const data = {
    labels: ["January", "Februari", "Maret", "April", "Mei", "Juni", "Juli"],
    datasets: [{
      data: [0.1, 0.4, 0.5, 0.8, 0.3, 0.2, 0.5],
    }]
  };

  return (
    <div className="chart-container w-full h-full relative">
      <Chart
        type='line'
        data={data}
        options={ConfigLine}
      />
    </div>
  );
};

export default CoinPriceChart;
