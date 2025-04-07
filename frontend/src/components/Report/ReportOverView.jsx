import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ff99ff', '#b3b3ff', '#ffb366', '#80ffaa', '#ff80bf', '#cc99ff'];

const ReportOverView = ({ expenseHistory = [], budgetData = {} }) => {
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  // Memoize the derived data to prevent unnecessary re-computation
  const pieChartData = useMemo(() => {
    if (!expenseHistory?.length || !budgetData || !Object.keys(budgetData).length) {
      return [];
    }
    const categoryTotals = expenseHistory.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    return Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));
  }, [expenseHistory, budgetData]);

  const barChartData = useMemo(() => {
    if (!expenseHistory?.length || !budgetData || !Object.keys(budgetData).length) {
      return [];
    }
    const monthlyData = expenseHistory.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = { expense: 0, income: 0 };
      }
      acc[monthYear].expense += expense.amount;
      return acc;
    }, {});
    return Object.keys(monthlyData).map((month) => ({
      name: month,
      expense: monthlyData[month].expense,
      income: budgetData.income || 0,
    }));
  }, [expenseHistory, budgetData]);

  useEffect(() => {
    console.log("ReportOverView useEffect running");
    setPieData(pieChartData);
    setBarData(barChartData);
  }, [pieChartData, barChartData]); // Depend on memoized data, not raw inputs

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Reports Overview</h2>
      {pieData.length === 0 && barData.length === 0 ? (
        <p className="text-gray-500">No data available yet. Add expenses to see reports.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `£${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Income vs. Expense</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `£${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" name="Income" />
                <Bar dataKey="expense" fill="#ff6f61" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ReportOverView;

