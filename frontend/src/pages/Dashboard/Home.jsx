import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import Dashboard from "../../components/Dashboards/Dashboard"; 

const Home = ({ budgetData, expenseHistory, handleAddExpense }) => {
  useUserAuth();
  const navigate = useNavigate();

  console.log("dashborad rendering"); 
  console.log("Home budgetData:", budgetData);
  console.log("Home expenseHistory:", expenseHistory);

 
  const { income = 0, totalBudget: budget = 0, categories = {} } = budgetData || {};

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <Dashboard
          income={income}
          budget={budget}
          categories={categories}
          expenseHistory={expenseHistory || []}
          handleAddExpense={handleAddExpense}
        />
      </div>
    </DashboardLayout>
  );
};

export default Home;

