import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "../../routes/styles/reports.css";

interface ChartData {
  name: string;
  value: number;
}

interface DataItem {
  questionText: string;
  optionDescription: string;
}

export default function Graphics({ data }: { data: DataItem[] }) {
  const [chartsData, setChartsData] = useState<Record<string, ChartData[]>>({});

  useEffect(() => {
    if (!data || data.length === 0) return;

    const groupedData: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
      if (!groupedData[item.questionText]) {
        groupedData[item.questionText] = {};
      }
      groupedData[item.questionText][item.optionDescription] =
        (groupedData[item.questionText][item.optionDescription] || 0) + 1;
    });

    const formattedData: Record<string, ChartData[]> = {};
    Object.keys(groupedData).forEach((question) => {
      formattedData[question] = Object.keys(groupedData[question]).map(
        (key) => ({
          name: key,
          value: groupedData[question][key],
        })
      );
    });

    setChartsData(formattedData);
  }, [data]);

  const COLORS = ["#6B9AC4", "#86C5A4", "#B07BC5"];

  if (Object.keys(chartsData).length === 0)
    return <p>⏳ Cargando gráficos...</p>;

  return (
    <div id="container_graphics">
      {Object.keys(chartsData).map((question, index) => (
        <div key={index} className="chart-container">
          <h3>{question}</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={chartsData[question]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ value }) => `${value}`}
            >
              {chartsData[question].map((entry, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          
        </div>
      ))}
    </div>
  );
}
