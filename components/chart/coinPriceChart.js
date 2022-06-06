import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { Config } from 'components/chart/chartConfig';

const CoinPriceChart = (props) => {
  const formatData = (data) => {
    // coingecko api provides the prices in an Array[Array[date, price]] format
    // so we will map throught each timestamp of the prices array
    return data.map((el) => {
      //   we will return the price & date values as an Array[Object{x: date, y: price}]
      //   which is in a datastructure that chart.js expects its input to be
      return {
        // lets convert our date to a localeString and use only the necessary
        // part like minutes and hours
        x: new Date(el[0]).toLocaleString().substr(11, 9),
        // also lets truncate our price to 2 decimal points for better redabililty
        y: el[1].toFixed(2)
      };
    });
  };

  const data = {
    datasets: [
      {
        label: 'Bitcoin Price Chart',
        fill: true,
        data: formatData(props.prices),

        borderColor: '#3B82F6',

        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        pointRadius: props.pointRadius,
        pointHoverRadius: 5,
        borderCapStyle: 'butt',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderWidth: 2
      }
    ]
  };

  return (
    <div className="chart-container w-full h-full">
      <Line data={data} options={Config} />
    </div>
  );
};

export default CoinPriceChart;
