
import React from 'react';
import ReportOverView from '../../components/Report/ReportOverView';
import DashboardLayout from '../../components/layouts/DashboardLayout';


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

