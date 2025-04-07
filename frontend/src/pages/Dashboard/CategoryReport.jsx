
import React from 'react';
import ReportOverView from '../../components/Report/ReportOverView';
import DashboardLayout from '../../components/layouts/DashboardLayout';


const CategoryReport = ({ expenseHistory, budgetData }) => {
  console.log("CategoryReport rendering");
  return (
    <DashboardLayout activeMenu="Reports">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ReportOverView
            expenseHistory={expenseHistory}
            budgetData={budgetData}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryReport;