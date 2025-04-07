import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import CustomLegend from './customLegend';
import CustomTooltip from './CustomTooltip';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextArch,
}) => {
  return (
    <ResponsiveContainer width="100%" height={388}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={138}
          innerRadius={108}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip}/>
        <Legend content={CustomLegend}/>

        {showTextArch && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
