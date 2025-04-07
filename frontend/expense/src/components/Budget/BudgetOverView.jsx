import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BudgetOverView = ({ income, budget, categories = {}, updateBudget }) => {
  const [localIncome, setLocalIncome] = useState(income || 0);
  const [localBudget, setLocalBudget] = useState(budget || 0);
  const [localCategories, setLocalCategories] = useState(categories || {});
  const [isEditing, setIsEditing] = useState(true);  // Track if the user is editing
  const [isSaved, setIsSaved] = useState(false);  // Track if the budget has been saved

  // Predefined category list (user can edit amounts)
  const defaultCategories = [
    "Transport",
    "Charity",
    "Feeding",
    "Leisure",
    "Investment",
    "CC Repayment",
    "Bills",
    "Emergency",
    "Celebration",
    "Miscellaneous",
    "Savings",
  ];

  useEffect(() => {
    // Initialize categories with 0 if not already set
    const initializedCategories = {};
    defaultCategories.forEach((cat) => {
      initializedCategories[cat] = localCategories[cat] || 0;
    });
    setLocalCategories(initializedCategories);
  }, []);

  const handleIncomeChange = (e) => setLocalIncome(Number(e.target.value) || 0);
  const handleBudgetChange = (e) => setLocalBudget(Number(e.target.value) || 0);
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setLocalCategories((prev) => ({
      ...prev,
      [name]: Number(value) || 0,
    }));
  };

  const handleSave = () => {
    const totalAllocated = Object.values(localCategories).reduce(
      (total, value) => total + Number(value),
      0
    );
    if (totalAllocated > localBudget) {
      toast.error("Total allocated exceeds available budget!");
      return;
    }
    updateBudget({
      income: localIncome,
      totalBudget: localBudget,
      categories: localCategories,
    });
    setIsSaved(true);  // Mark the budget as saved
    setIsEditing(false);  // Disable editing mode
    toast.success("Budget saved successfully!");
  };

  const handleEdit = () => {
    setIsEditing(true);  // Enable editing mode
    setIsSaved(false);   // Mark the budget as unsaved
  };

  const totalAllocated = Object.values(localCategories).reduce(
    (total, value) => total + Number(value),
    0
  );

  return (
    <div className="card bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-10">
        <h5 className="text-lg font-semibold">Set Up Your Budget</h5>
        {isSaved && (
          <button
            onClick={handleEdit}
            className="text-blue-600 text-sm font-semibold"
          >
            Edit Budget
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="income" className="block text-lg font-medium text-gray-700">
            Monthly Income
          </label>
          <input
            type="number"
            id="income"
            value={localIncome}
            onChange={handleIncomeChange}
            disabled={!isEditing} // Disable editing if not in editing mode
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-lg font-medium text-gray-700">
            Available Budget
          </label>
          <input
            type="number"
            id="budget"
            value={localBudget}
            onChange={handleBudgetChange}
            disabled={!isEditing} // Disable editing if not in editing mode
            className="w-full mt-2 p-3 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-6 mt-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Budget Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">Monthly Income</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">£{localIncome.toFixed(2)}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-green-600">Available Budget</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">£{localBudget.toFixed(2)}</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-purple-600">Total Allocated</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">£{totalAllocated.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Category Breakdown</h4>
          <ul className="space-y-2">
            {defaultCategories.map((category) => (
              <li key={category} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{category}</span>
                <input
                  type="number"
                  name={category}
                  value={localCategories[category] || 0}
                  onChange={handleCategoryChange}
                  disabled={!isEditing} // Disable editing if not in editing mode
                  className="w-24 p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        {isEditing && (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save Budget
          </button>
        )}
      </div>
    </div>
  );
};

export default BudgetOverView;
