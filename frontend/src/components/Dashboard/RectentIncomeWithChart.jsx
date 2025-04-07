import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Chart/CustomPieChart';

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4539f6"]; 

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Last 60 Days Income</h3>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor={true}
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
