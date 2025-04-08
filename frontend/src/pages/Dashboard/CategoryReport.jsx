
import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReportOverView from "../../components/Report/ReportOverView";


const CategoryReport = ({ expenseHistory, budgetData }) => {
  console.log("CategoryReport rendering");
  console.log("CategoryReport expenseHistory:", expenseHistory);
  console.log("CategoryReport budgetData:", budgetData);
  return (
    <DashboardLayout activeMenu="Reports">
      <div className="my-5 mx-auto">
        <ReportOverView expenseHistory={expenseHistory} budgetData={budgetData} />
      </div>
    </DashboardLayout>
  );
};

export default CategoryReport;