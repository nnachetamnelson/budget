import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddExpenseOverView from "../../components/AddExpense/AddExpenseOverView";

const AddExpense = ({ expenseHistory, handleAddExpense, categories }) => {
  return (
    <DashboardLayout activeMenu="AddExpense">
      <div className="my-5 mx-auto">
        <AddExpenseOverView
          expenseHistory={expenseHistory}
          handleAddExpense={handleAddExpense}
          categories={Object.keys(categories)} 
        />
      </div>
    </DashboardLayout>
  );
};

export default AddExpense;