import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Dashboard from "../../components/Dashboards/Dashboard"; // Adjusted path

const Home = ({ income, budget, categories, expenseHistory, handleAddExpense }) => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("dashborad rendering");

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <Dashboard
          income={income}
          budget={budget}
          categories={categories}
          expenseHistory={expenseHistory}
          dashboardData={dashboardData} // Pass fetched data if needed
        />
      </div>
    </DashboardLayout>
  );
};

export default Home;