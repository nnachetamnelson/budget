import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import BudgetOverView from "../../components/Budget/BudgetOverView";

const SetupBudget = ({ income }) => {
  return (
    <DashboardLayout activeMenu="Stats">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <BudgetOverView
            income={income}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SetupBudget;