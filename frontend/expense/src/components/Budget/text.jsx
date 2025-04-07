import React, { useState } from "react";

const BudgetOverView = () => {

     // State management
  const [income, setIncome] = useState(3903.18);
  const [budget, setBudget] = useState(3000);
  const [categories, setCategories] = useState({
    Transport: 300,
    Charity: 100,
    Feeding: 250,
    Leisure: 200,
    Investment: 150,
    CCRepayment: 100,
    Bills: 500,
    Emergency: 100,
    Celebration: 50,
    Miscellaneous: 100,
    Savings: 200,
  });

  // Handle changes
  const handleIncomeChange = (e) => setIncome(e.target.value);
  const handleBudgetChange = (e) => setBudget(e.target.value);
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategories((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total allocated amount
  const totalAllocated = Object.values(categories).reduce(
    (total, value) => total + Number(value),
    0
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-10">
      <div>
        <h5 className="text-lg font-semibold">
          Set Up Your Budget
        </h5>
        </div>
        </div>

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
    
  )
}

export default BudgetOverView