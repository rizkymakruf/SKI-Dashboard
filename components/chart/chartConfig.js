const cAmber = (n) => `rgba(250,174,50, ${n})`;

let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  const r = () => Math.random() * 256 >> 0;
  const cRgba = (n) => `rgba(${r()}, ${r()}, ${r()}, ${n})`;

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(1, `${cAmber(1)}`);
    gradient.addColorStop(0.5,  `${cAmber(0.32)}`);
    gradient.addColorStop(0, `${cAmber(0)}`);
  }

  return gradient;
}

export const ConfigLine = {
  plugins: {
    legend: {
      display: false,
    },
  },
  lineHeightAnnotation: {
    always: true,
    lineWeight: 1.5,
  },
  animation: {
    duration: 1,
  },
  maintainAspectRatio: false,
  responsive: true,
  elements: {
    line: {
      tension: 0,
      borderWidth: 1,
      fill: "start",
      backgroundColor: function(context) {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) {
          return;
        }
        return getGradient(ctx, chartArea);
      },
      borderColor: "rgba(250,174,50, 4)",
    },
    point: {
      radius: 0,
      hitRadius: 0
    }
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    }
  }
};

export const Config = {
  plugins: {
    // show legends for our graph
    legend: {
      display: true,
    },
  },
  lineHeightAnnotation: {
    always: true,
    lineWeight: 1.5,
  },

//   animate in
  animation: {
    duration: 1,
  },
  maintainAspectRatio: false,
  responsive: true,

//   show the x and y scales
  scales: {
    x: { display: true },
    y: { display: true },
  },
};
