import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message || "Something went wrong"}</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route key="dashboard" path="/dashboard" element={<ProtectedRoute component={Home} />} />
            <Route key="addexpense" path="/addexpense" element={<ProtectedRoute component={AddExpense} />} />
            <Route key="reports" path="/reports" element={<ProtectedRoute component={CategoryReport} />} />
            <Route key="setupbudget" path="/setupbudget" element={<ProtectedRoute component={SetupBudget} />} />
            <Route key="income" path="/income" element={<ProtectedRoute component={Income} />} />
            <Route key="expense" path="/expense" element={<ProtectedRoute component={Expense} />} />
          </Routes>
        </ErrorBoundary>
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
  const { token, clearUser } = useContext(UserContext);
  const [budgetData, setBudgetData] = useState(null);
  const [expenseHistory, setExpenseHistory] = useState([]);
  const location = useLocation();

  console.log(`Current URL: ${location.pathname}`);
  console.log(`ProtectedRoute rendering for path: ${location.pathname}, Component: ${Component.name}`);
  console.log("App.jsx version: NO_LOADING_2025");

  const fetchBudgetData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.API.GET_BUDGET_API);
      console.log("Budget Data Fetched:", response.data);
      setBudgetData(response.data || { income: 0, totalBudget: 0, categories: new Map() });
    } catch (error) {
      console.error("Error fetching budget:", error);
      setBudgetData({ income: 0, totalBudget: 0, categories: new Map() });
    }
  };

  const fetchExpenses = async () => {
    try {
      console.log("Fetching expenses with token:", localStorage.getItem("token"));
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
      console.log("Add response:", response.data);
      setExpenseHistory((prev) => [response.data, ...prev]);
      await fetchBudgetData();
      return response.data;
    } catch (error) {
      console.error("Error adding expense:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  const handleEditExpense = async (id, updatedExpense) => {
    try {
      console.log("Sending PUT request to:", API_PATHS.API.EDIT_EXPENSE_API(id), "with data:", updatedExpense);
      const response = await axiosInstance.put(API_PATHS.API.EDIT_EXPENSE_API(id), updatedExpense);
      console.log("Edit response:", response.data);
      setExpenseHistory((prev) =>
        prev.map((exp) => (exp._id === id ? { ...exp, ...response.data } : exp))
      );
      await fetchBudgetData();
      return response.data;
    } catch (error) {
      console.error("Edit expense failed:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: API_PATHS.API.EDIT_EXPENSE_API(id),
      });
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      console.log("Sending DELETE request to:", API_PATHS.API.DELETE_EXPENSE_API(id));
      const response = await axiosInstance.delete(API_PATHS.API.DELETE_EXPENSE_API(id));
      console.log("Delete response:", response.data);
      setExpenseHistory((prev) => prev.filter((exp) => exp._id !== id));
      await fetchBudgetData();
    } catch (error) {
      console.error("Delete expense failed:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: API_PATHS.API.DELETE_EXPENSE_API(id),
      });
      throw error;
    }
  };

  const handleUpdateBudget = async (updatedBudget) => {
    try {
      const response = await axiosInstance.put(API_PATHS.API.ADD_API, updatedBudget);
      console.log("Budget update response:", response.data);
      setBudgetData(response.data);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  useEffect(() => {
    console.log(`useEffect triggered for path: ${location.pathname}, token: ${token ? 'present' : 'absent'}`);
    if (token && (budgetData === null || expenseHistory.length === 0)) {
      fetchBudgetData();
      fetchExpenses();
    }
  }, [token]);

  if (!token) {
    console.log("No token, redirecting to /login");
    return <Navigate to="/login" />;
  }

  console.log("Budget data before render:", budgetData);
  console.log("Expense history before render:", expenseHistory);
  console.log(`Rendering Component: ${Component.name} for path: ${location.pathname}`);
  return (
    <Component
      budgetData={budgetData}
      expenseHistory={expenseHistory}
      handleAddExpense={handleAddExpense}
      handleEditExpense={handleEditExpense}
      handleDeleteExpense={handleDeleteExpense}
      updateBudget={handleUpdateBudget}
    />
  );
};

export default App;





