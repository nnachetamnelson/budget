import React from "react";
import moment from "moment";

const TransportCard = ({ transactions, allocated = 300 }) => {
  const categoryIcons = { Transport: "🚗" };
  const totalSpent = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  const isOverAllocated = totalSpent > allocated;

  return (
    <div className={`bg-white p-4 rounded-xl shadow ${isOverAllocated ? "border-red-200" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Transport</h3>
        <div className="flex items-center gap-2">
          {isOverAllocated && (
            <span className="text-red-500 text-xs font-semibold bg-red-100 px-1 rounded">
              ⚠️ Overspent
            </span>
          )}
          <button className="text-sm text-blue-600 hover:underline">See All</button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transport transactions.</p>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Total Spent: £{totalSpent.toFixed(2)} / £{allocated.toFixed(2)}
            {isOverAllocated && (
              <span className="text-red-500 font-semibold"> (Over by £{(totalSpent - allocated).toFixed(2)})</span>
            )}
          </p>
          <ul className="space-y-3">
            {transactions.slice(0, 5).map((tx) => (
              <li key={tx._id || `${tx.date}-${tx.amount}`} className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-3 items-center">
                  <span className="text-xl">{tx.icon || categoryIcons[tx.category] || "🚗"}</span>
                  <div>
                    <p className="font-medium">{tx.source || tx.description || "Unknown"}</p>
                    <p className="text-xs text-gray-400">
                      {moment(tx.date).format("Do MMM YYYY")}
                    </p>
                  </div>
                </div>
                <span className="text-red-500 font-semibold">
                  -£{Number(tx.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransportCard;

