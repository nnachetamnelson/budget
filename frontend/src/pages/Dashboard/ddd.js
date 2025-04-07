import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverView from '../../components/Income/IncomeOverView';
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths'; 
import { toast, Toaster } from 'react-hot-toast';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/Income/DeleteAlert ';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        console.log("✅ Income data fetched:", response.data); // Debug log
        setIncomeData(response.data);
      } else {
        console.log("⚠️ No data returned from income API.");
      }
    } catch (error) {
      console.log("❌ Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to add income.");
    }
  };

  const deleteIncome = async (id) => {

    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME, {id});

      setOpenDeleteAlert({show:false, data:null});
      toast.success("Income detail deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete income.");
    }
    
  };

  const handleDownloadIncomeDetails = async () => {
    // to be implemented
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  console.log("📦 Current incomeData state:", incomeData); // Debug log

  return (
    <DashboardLayout activeMenu="Dashboard">
      <Toaster 
        toastOptions={{
          className: '',
          style: { fontSize: '13px' }
        }}
      />
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
              transactions={incomeData}
              onDelete={(id) => { setOpenDeleteAlert({show:true, data: id});
            }}
            onDownload={handleDownloadIncomeDetails}
            />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal 
        
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show:true, data: id})}
        title="Delete Income"
        >
          <DeleteAlert
          content="Are you sure you want to delete this income detail?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;










<RecentTransactions
            transactions={dashboardData?.recentTransactions || []} // Default to empty array if undefined
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []} // Default to empty array if undefined
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []} // Default to empty array if undefined
          />
          <RectentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []} // Slice if there are more than 4 items
            totalIncome={dashboardData?.totalIncome || 0}
          />
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []} // Default to empty array if undefined
            onSeeMore={() => navigate("/income")}
          />
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []} // Default to empty array if undefined
            
          />




















          import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths'; 
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RectentIncomeWithChart from '../../components/Dashboard/RectentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Transports from '../../components/Dashboard/Transports';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        console.log("Fetched data:", response.data);  // Log the fetched data to verify its structure
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading || !dashboardData) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icons={<IoMdCard />}
            label="Budget"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icons={<LuWalletMinimal />}
            label="Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icons={<LuHandCoins />}
            label="Remaining"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          <Transports
            transactions={dashboardData?.last60DaysIncome?.transactions || []} 
          />
          <Transports
            transactions={dashboardData?.last60DaysIncome?.transactions || []} 
          />
          <Transports
            transactions={dashboardData?.last60DaysIncome?.transactions || []} 
          />
          <Transports
            transactions={dashboardData?.last60DaysIncome?.transactions || []} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
