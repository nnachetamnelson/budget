import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddExpenseOverView from "../../components/AddExpense/AddExpenseOverView";

const AddExpense = ({ budgetData, expenseHistory, handleAddExpense }) => {
  console.log("AddExpense rendering");
  console.log("AddExpense budgetData:", budgetData);
  console.log("AddExpense expenseHistory:", expenseHistory);


  const categories = budgetData?.categories ? Object.keys(budgetData.categories) : [];

  return (
    <DashboardLayout activeMenu="AddExpense">
      <div className="my-5 mx-auto">
        <AddExpenseOverView
          expenseHistory={expenseHistory || []}
          handleAddExpense={handleAddExpense}
          categories={categories}
        />
      </div>
    </DashboardLayout>
  );
};

export default AddExpense;

