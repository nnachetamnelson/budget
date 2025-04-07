import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Chart/CustomBarChart';


const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Last 30 Days Expenses</h3>
      </div>

     <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
