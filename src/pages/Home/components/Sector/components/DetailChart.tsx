import { FC, MouseEvent as ReactMouseEvent } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  ChartData,
  ChartDataset,
  ChartOptions,
  Legend,
  LegendItem,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useRef } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface DetailChartProps {
  labels: string[];
  datasets: ChartDataset<"line", number[]>[];
  className?: string;
  align?: "start" | "end" | "center";
  onClick?: (
    event: ReactMouseEvent<HTMLCanvasElement, MouseEvent>,
    chart: Chart<"line", number[], string>,
  ) => void;
  zeroAtYAxis?: boolean;
}

const DetailChart: FC<DetailChartProps> = ({
  labels,
  datasets,
  className,
  align = "center",
  onClick = () => {},
  zeroAtYAxis = true,
}) => {
  const chartRef = useRef<Chart<"line", number[], string>>(null);
  const onClickChart = (
    event: ReactMouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    onClick(event, chart);
  };
  

  const chartData: ChartData<"line", number[], string> = {
    labels,
    datasets,
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    aspectRatio: 0,
    backgroundColor: "#fff",
    interaction: {
      mode: "index" as const,
      axis: "x" as const,
    },
    plugins: {
      legend: {
        position: "top" as const,
        align,
        display: true,
        labels: {
          color: "#4D5256",
          usePointStyle: true,
          pointStyle: "rect" as const,
          generateLabels: (chart) => {
            const { datasets } = chart.data;
            return datasets.map((dataset) => ({
              text: dataset.label as string,
              fillStyle: dataset.borderColor as string,
              hidden: dataset.hidden as boolean,
              lineCap: "round" as const,
              lineDash: [] as number[],
              lineWidth: 2,
              strokeStyle: dataset.borderColor as string,
              pointStyle: "rect" as const,
              datasetIndex: dataset.order as number,
            })) as LegendItem[];
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    hover: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        axis: "y",
        beginAtZero: zeroAtYAxis,
        afterDataLimits: (scale) => {
          scale.max = scale.max * 1.05;
          scale.min = scale.min * 0.95;
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 5,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className={className}>
      <Line
        data={chartData}
        options={chartOptions}
        ref={chartRef}
        onClick={onClickChart}
      />
    </div>
  );
};

export default DetailChart;
