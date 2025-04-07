import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import CategoryReport from "./pages/Dashboard/CategoryReport";
import AddExpense from "./pages/Dashboard/AddExpense";
import SetupBudget from "./pages/Dashboard/SetupBudget";
import Stats from "./pages/Dashboard/Stats";
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
          <Route key="dashboard" path="/dashboard" element={<ProtectedRoute component={Home} />} />
          <Route key="addexpense" path="/addexpense" element={<ProtectedRoute component={AddExpense} />} />
          <Route key="reports" path="/reports" element={<ProtectedRoute component={CategoryReport} />} />
          <Route key="setupbudget" path="/setupbudget" element={<ProtectedRoute component={SetupBudget} />} />
          <Route key="stats" path="/stats" element={<ProtectedRoute component={Stats} />} />
          <Route key="income" path="/income" element={<ProtectedRoute component={Income} />} />
          <Route key="expense" path="/expense" element={<ProtectedRoute component={Expense} />} />
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
  const location = useLocation();

  console.log(`ProtectedRoute rendering for path: ${location.pathname}, Component: ${Component.name}`);

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
    console.log(`useEffect triggered for path: ${location.pathname}, token: ${token ? 'present' : 'absent'}`);
    if (token) {
      setLoading(true);
      Promise.all([fetchBudgetData(), fetchExpenses()])
        .then(() => {
          console.log(`Data fetch completed for path: ${location.pathname}`);
          setLoading(false);
        })
        .catch(() => {
          console.log(`Data fetch failed for path: ${location.pathname}`);
          setLoading(false);
        });
    }
  }, [token, location.pathname]);

  if (!token) {
    console.log("No token, redirecting to /login");
    return <Navigate to="/login" />;
  }
  if (loading) {
    console.log(`Showing loading screen for path: ${location.pathname}`);
    return <div>Loading...</div>;
  }

  console.log(`Rendering Component: ${Component.name} for path: ${location.pathname}`);
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