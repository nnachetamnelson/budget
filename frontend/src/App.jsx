import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import CategoryReport from "./pages/Dashboard/CategoryReport";
import AddExpense from "./pages/Dashboard/AddExpense";
import SetupBudget from "./pages/Dashboard/SetupBudget";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider, { UserContext } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import axiosInstance from "./utils/axiosInstance";
import { API_PATHS } from "./utils/apiPaths";



const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Home} />} />
          <Route path="/addexpense" element={<ProtectedRoute component={AddExpense} />} />
          <Route path="/reports" element={<ProtectedRoute component={CategoryReport} />} />
          <Route path="/setupbudget" element={<ProtectedRoute component={SetupBudget} />} />
          <Route path="/income" element={<ProtectedRoute component={Income} />} />
          <Route path="/expense" element={<ProtectedRoute component={Expense} />} />
        </Routes>
      </Router>
      <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

const Root = () => {
  const { token } = useContext(UserContext);
  return token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const ProtectedRoute = ({ component: Component }) => {
  const { token } = useContext(UserContext);
  const [budgetData, setBudgetData] = useState(null);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgetData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.API.GET_BUDGET_API);
      console.log("Budget Data Fetched:", response.data); 
      setBudgetData(response.data || { income: 0, totalBudget: 0, categories: {} });
    } catch (error) {
      console.error("Error fetching budget:", error);
      setBudgetData({ income: 0, totalBudget: 0, categories: {} }); 
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.API.GET_EXPENSE_API);
      console.log("Expenses Fetched:", response.data);
      setExpenseHistory(response.data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenseHistory([]);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      const response = await axiosInstance.post(API_PATHS.API.ADD_EXPENSE_API, expense);
      setExpenseHistory((prev) => [response.data, ...prev]);
      await fetchBudgetData(); 
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleUpdateBudget = async (updatedBudget) => {
    try {
      const response = await axiosInstance.put(API_PATHS.API.ADD_API, updatedBudget);
      setBudgetData(response.data);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  useEffect(() => {
    if (token) {
      Promise.all([fetchBudgetData(), fetchExpenses()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false)); 
    }
  }, [token]);

  if (!token) return <Navigate to="/login" />;
  if (loading) return <div>Loading...</div>;

  return (
    <Component
      income={budgetData?.income || 0}
      budget={budgetData?.totalBudget || 0}
      categories={budgetData?.categories || {}}
      expenseHistory={expenseHistory}
      handleAddExpense={handleAddExpense}
      updateBudget={handleUpdateBudget}
    />
  );
};

export default App;

