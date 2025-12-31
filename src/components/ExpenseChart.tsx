import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { groupByCategory } from "../logic/calculations";
import { type Expense } from "../types/Expense";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#F44336",
  "#9C27B0"
];

type Props = {
  expenses: Expense[];
  size: number;
};

export const ExpenseChart = ({ expenses, size }: Props) => {
  const grouped = groupByCategory(expenses);
  const values = Object.values(grouped);
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "1rem auto"
      }}
    >
      <Pie
        key={size}
        data={{
          labels: Object.keys(grouped),
          datasets: [
            {
              data: values,
              backgroundColor: COLORS.slice(0, values.length),
              borderWidth: 1
            }
          ]
        }}
        options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            position: "bottom"
            },
            datalabels: {
            color: "#fff",
            font: {
                weight: "bold",
                size: 12
            },
            formatter: (value: number) => {
                const percent = ((value / total) * 100).toFixed(1);
                return `${percent}%`;
            }
            },
            tooltip: {
            callbacks: {
                label: (context) => {
                const value = context.parsed as number;
                const percent = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value.toFixed(2)} zł (${percent}%)`;
                }
            }
            }
        }
        }}
      />
    </div>
  );
};
