import React from "react";
import moment from "moment";

const RecentExpenses = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-bold mb-4">Recent Expenses</h3>
      <ul className="divide-y">
        {transactions.slice(0, 5).map((tx) => (
          <li key={tx._id || `${tx.date}-${tx.amount}`} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{tx.source || tx.description || "Unknown"}</p>
              <p className="text-sm text-gray-500">{moment(tx.date).format("Do MMM")}</p>
            </div>
            <span className="text-red-500 font-semibold">
              -£{Number(tx.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentExpenses;
