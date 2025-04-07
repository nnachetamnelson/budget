import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReportOverView from "../../components/Report/ReportOverView";

const SetupBudget = ({ expenseHistory }) => {
  return (
    <DashboardLayout activeMenu="Stats">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ReportOverView
           expenseHistory={expenseHistory}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SetupBudget;