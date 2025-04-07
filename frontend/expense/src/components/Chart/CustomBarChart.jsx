import React from 'react';
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

const CustomBarChart = ({ data }) => {
  // function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-500">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-500">${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={308}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Bar
            dataKey="amount"
            fill="#FF8842"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
          <Tooltip content={<CustomTooltip />} />
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
