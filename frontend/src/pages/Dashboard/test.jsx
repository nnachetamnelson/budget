<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Set Up Your Budget
        </h1>

        {/* Monthly Income and Budget Inputs */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="income"
              className="block text-lg font-medium text-gray-700"
            >
              Monthly Income
            </label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={handleIncomeChange}
              className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all ease-in-out"
            />
          </div>

          <div>
            <label
              htmlFor="budget"
              className="block text-lg font-medium text-gray-700"
            >
              Available Budget
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={handleBudgetChange}
              className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all ease-in-out"
            />
          </div>
        </div>

        {/* Budget Summary Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Budget Summary</h2>

          {/* Budget Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-600">Monthly Income</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-2">£{income}</p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-green-600">Available Budget</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-2">£{budget}</p>
            </div>

            <div className="bg-purple-100 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-purple-600">Total Allocated</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-2">£{totalAllocated}</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Category Breakdown</h4>
            <ul className="space-y-2">
              {Object.entries(categories).map(([category, value]) => (
                <li key={category} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{category}</span>
                  <input
                    type="number"
                    name={category}
                    value={value}
                    onChange={handleCategoryChange}
                    className="w-24 p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all ease-in-out"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            Save Budget
          </button>
        </div>
      </div>
    </div>

    import React, { useState } from "react";
    
    const AddExpense = () => {
      const [amount, setAmount] = useState("");
      const [category, setCategory] = useState("");
      const [description, setDescription] = useState("");
      const [paymentMethod, setPaymentMethod] = useState("");
      const [date, setDate] = useState("");
      const [expenseHistory, setExpenseHistory] = useState([]);
    
      // Categories list for dropdown
      const categories = [
        "Transport",
        "Food",
        "Bills",
        "Entertainment",
        "Health",
        "Leisure",
        "Others",
      ];
    
      const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && category && description && paymentMethod && date) {
          // Add the new expense to the history
          setExpenseHistory([
            ...expenseHistory,
            { amount, category, description, paymentMethod, date },
          ]);
    
          // Reset the form after submission
          setAmount("");
          setCategory("");
          setDescription("");
          setPaymentMethod("");
          setDate("");
        }
      };
    
      const handleReset = () => {
        setAmount("");
        setCategory("");
        setDescription("");
        setPaymentMethod("");
        setDate("");
      };
    
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full space-y-8">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Add New Expense
            </h1>
    
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-lg font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter amount"
                />
              </div>
    
              <div>
                <label
                  htmlFor="category"
                  className="block text-lg font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
    
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter description"
                />
              </div>
    
              <div>
                <label
                  htmlFor="paymentMethod"
                  className="block text-lg font-medium text-gray-700"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Payment Method</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
    
              <div>
                <label
                  htmlFor="date"
                  className="block text-lg font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
    
              <div className="flex justify-between items-center">
                <button
                  type="reset"
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add Expense
                </button>
              </div>
            </form>
    
            {/* Recent Expense History */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Recent Expenses
              </h2>
              <div className="space-y-4">
                {expenseHistory.map((expense, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{expense.category}</p>
                      <p className="text-sm text-gray-600">{expense.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">£{expense.amount}</p>
                      <p className="text-sm text-gray-600">{expense.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default AddExpense;













    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Add New Expense
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="amount"
            className="block text-lg font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-lg font-medium text-gray-700"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-lg font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="reset"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Expense
          </button>
        </div>
      </form>

      {/* Recent Expense History */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Expenses
        </h2>
        <div className="space-y-4">
          {expenseHistory.map((expense, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{expense.category}</p>
                <p className="text-sm text-gray-600">{expense.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-800">£{expense.amount}</p>
                <p className="text-sm text-gray-600">{expense.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>








import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 200 },
  { name: 'Bills', value: 1000 },
];

const reportData = [
  { name: 'January', expense: 500, income: 700 },
  { name: 'February', expense: 600, income: 800 },
  { name: 'March', expense: 700, income: 750 },
  { name: 'April', expense: 800, income: 850 },
];

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    // Fetch or calculate expense data here
    setExpenses(data);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Reports Overview</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700">Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={500}> {/* Increased height */}
          <PieChart>
            <Pie data={expenses} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={230} fill="#8884d8">
              {expenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'][index % 4]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Income vs. Expense Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700">Income vs. Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#ff6f61" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Download Report Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Reports;




 <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Reports Overview</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700">Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={500}> 
          <PieChart>
            <Pie data={expenses} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={230} fill="#8884d8">
              {expenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'][index % 4]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700">Income vs. Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#ff6f61" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Download Report
        </button>
      </div>
    </div>