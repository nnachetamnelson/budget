import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import BudgetOverView from "../../components/Budget/BudgetOverView";

const SetupBudget = ({ income, budget, categories, updateBudget }) => {
  return (
    <DashboardLayout activeMenu="Budget">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <BudgetOverView
            income={income}
            budget={budget}
            categories={categories}
            updateBudget={updateBudget}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SetupBudget;
