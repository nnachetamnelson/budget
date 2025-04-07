import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const Transports = ({ transactions, budgetAmount = 0, onSeeMore }) => {
  const transportExpenses = transactions?.filter(
    (item) => item.category === "Transport"
  );

  const totalSpent = transportExpenses?.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );

  const remaining = budgetAmount - totalSpent;
  const progress = Math.min((totalSpent / budgetAmount) * 100, 100);

  const progressColor =
    progress < 50 ? "bg-green-500" : progress < 80 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 transition hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🚗 Transport
        </h5>
        {onSeeMore && (
          <button
            onClick={onSeeMore}
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            See More <LuArrowRight className="ml-1" />
          </button>
        )}
      </div>

      {/* Budget Overview */}
      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <p>
          <span className="font-semibold">Budget:</span> £{budgetAmount.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Spent:</span>{" "}
          <span className="text-gray-800 font-medium">£{totalSpent.toFixed(2)}</span>
        </p>
        <p>
          <span className="font-semibold">Remaining:</span>{" "}
          <span className={remaining < 0 ? "text-red-600 font-semibold" : ""}>
            £{remaining.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 rounded-full bg-gray-200 mb-5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        {transportExpenses?.length ? (
          transportExpenses?.slice(0, 5)?.map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No transport expenses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Transports;
