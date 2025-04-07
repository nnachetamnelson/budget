import React from "react";

const BudgetSummary = ({ categories }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Budget Allocation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const spent = Number(cat.spent) || 0;
          // allocated is treated as a constant value from props
          const allocated = Number(cat.allocated) || 0;
          
          // Calculate percentage spent using the fixed allocated amount
          const percentSpent = allocated > 0 
            ? Math.min((spent / allocated) * 100, 999).toFixed(1) 
            : 0;
          const isOverAllocated = spent > allocated;
          const remaining = allocated - spent;

          return (
            <div
              key={cat.name}
              className={`p-4 border rounded-xl flex flex-col gap-3 transition-all ${
                isOverAllocated 
                  ? "bg-red-50 border-red-200" 
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-gray-700">{cat.name}</div>
                {isOverAllocated && (
                  <span className="text-red-600 text-xs font-medium bg-red-100 px-2 py-1 rounded-full">
                    ⚠️ Overspent
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-600">
                <span className={isOverAllocated ? "text-red-600" : "text-gray-600"}>
                  £{spent.toFixed(2)}
                </span>
                {/* allocated remains constant unless changed in budget settings */}
                <span> / £{allocated.toFixed(2)}</span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverAllocated ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(percentSpent, 100)}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>{percentSpent}% used</span>
                <span>
                  {remaining >= 0 
                    ? `£${remaining.toFixed(2)} left` 
                    : `£${Math.abs(remaining).toFixed(2)} over`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * BudgetSummary Component
 * @param {Object} props
 * @param {Array} props.categories - Array of category objects
 * @param {string} props.categories[].name - Category name
 * @param {number} props.categories[].spent - Amount spent
 * @param {number} props.categories[].allocated - Fixed allocated amount (only modifiable in budget settings)
 */
export default BudgetSummary;