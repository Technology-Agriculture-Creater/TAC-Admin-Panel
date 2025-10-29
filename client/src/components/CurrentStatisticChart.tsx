import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CurrentStatisticChartProps {
  data: {
    name: string;
    value: number;
    percentage: string;
    change: string;
    color: string;
  }[];
}

const CurrentStatisticChart: React.FC<CurrentStatisticChartProps> = ({
  data,
}) => {
  const chartData = {
    labels: data.map((entry) => entry.name),
    datasets: [
      {
        data: data.map((entry) => entry.value),
        backgroundColor: data.map((entry) => entry.color),
        borderColor: data.map((entry) => entry.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // We will render a custom legend below
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed.toLocaleString();
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Current Statistic vs Last week
      </h3>
      <div className="min-h-[200px] w-full flex justify-center items-center">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm mb-1"
          >
            <div className="flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span>{entry.name}</span>
            </div>
            <span
              className="font-semibold"
              style={{ color: entry.change.includes("+") ? "green" : "red" }}
            >
              {entry.change}
            </span>
            <span>{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentStatisticChart;
