import React, { useContext } from "react";
import { FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

const OverviewHeader = ({ income = 0, budget = 0, totalSpent = 0 }) => {
  const { user } = useContext(UserContext);
  const userName = user?.fullName || "User";

  const numericIncome = Number(income);
  const numericBudget = Number(budget);
  const numericTotalSpent = Number(totalSpent);
  const remaining = numericBudget - numericTotalSpent;
  const dti = numericIncome > 0 ? (numericTotalSpent / numericIncome) * 100 : 0;

  const dtiColor =
    dti < 30 ? "text-green-600" : dti < 60 ? "text-yellow-500" : "text-red-500";
  const isOverBudget = numericTotalSpent > numericBudget;

  return (
    <div className="w-full bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow mb-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-600">{userName}</span> 👋
          </h2>
          <p className="text-sm text-gray-500">Here's an overview of your financial health this month</p>
        </div>
        {isOverBudget && (
          <span className="text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded">
            ⚠️ Over Budget!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <FiDollarSign className="text-2xl text-blue-500" />
          <div>
            <p className="text-gray-500">Monthly Income</p>
            <h4 className="font-bold text-lg text-gray-800">£{numericIncome.toFixed(2)}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <BsWallet2 className="text-2xl text-green-500" />
          <div>
            <p className="text-gray-500">Budget</p>
            <h4 className="font-bold text-lg text-gray-800">£{numericBudget.toFixed(2)}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <FiTrendingUp className="text-2xl text-red-400" />
          <div>
            <p className="text-gray-500">Total Spent</p>
            <h4 className="font-bold text-lg text-gray-800">£{numericTotalSpent.toFixed(2)}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <FaBalanceScale className="text-2xl text-purple-500" />
          <div>
            <p className="text-gray-500">Remaining</p>
            <h4
              className={`font-bold text-lg ${remaining < 0 ? "text-red-500" : "text-gray-800"}`}
            >
              £{remaining.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-600 mb-1 font-medium">Debt-to-Income (DTI) Ratio</p>
        <div className="w-full h-3 rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              dti < 30 ? "bg-green-500" : dti < 60 ? "bg-yellow-400" : "bg-red-500"
            }`}
            style={{ width: `${Math.min(dti, 100)}%` }}
          ></div>
        </div>
        <p className={`mt-1 text-sm font-semibold ${dtiColor}`}>
          {dti.toFixed(2)}% {dti >= 60 && "⚠️ High DTI!"}
        </p>
      </div>
    </div>
  );
};

export default OverviewHeader;

