import React from "react";


import OverviewHeader from "./OverviewHeader";
import BudgetSummary from "./BudgetSummary";
import RecentExpenses from "./RecentExpenses";
import TransportCard from "./TransportCard";

const Dashboard = ({ income, budget, categories, expenseHistory, dashboardData }) => {
  const totalIncome = dashboardData?.totalIncome || income;
  const totalBudget = dashboardData?.totalBudget || budget;

  const categoryData = Object.entries(categories).map(([name, allocated]) => {
    const spent = expenseHistory
      .filter((exp) => exp.category === name)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);
    return { name, allocated, spent };
  });

  const totalSpent = expenseHistory.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="p-6 space-y-6">
      <OverviewHeader
        income={totalIncome}
        budget={totalBudget}
        totalSpent={totalSpent}
      />
      <BudgetSummary categories={categoryData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransportCard
            transactions={expenseHistory.filter((exp) => exp.category === "Transport")}
            allocated={categories.Transport}
          />
        </div>
        <div>
          <RecentExpenses transactions={expenseHistory} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;