// components/chart/task-line-chart.tsx
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type TaskChartProps = {
  data: { label: string; value: number }[];
};

export function TaskLineChart({ data }: TaskChartProps) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Jumlah Task",
        data: data.map((d) => d.value),
        borderColor: "#3B82F6",
        backgroundColor: "#93C5FD",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return Number(value).toFixed(0); 
          },
          stepSize: 1, 
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
