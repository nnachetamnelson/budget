import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'; 
import { LuImage, LuX } from 'react-icons/lu'; 

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
          {icon ? (
            <img src={icon} alt="Icon" className="w-full h-full object-cover" />
          ) : (
            <LuImage className="text-xl text-gray-500" />
          )}
        </div>
        <p className="text-sm mt-1 text-gray-600">
          {icon ? 'Change Icon' : 'Pick Icon'}
        </p>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 bg-white border rounded-lg shadow-lg z-50 p-2">
          <button
            className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emojiData) => {
              onSelect(emojiData?.imageUrl || emojiData?.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;































import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverView from '../../components/Income/IncomeOverView';
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths'; 
import { IoIosClose } from 'react-icons/io';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

const Income = () => {

  const [incomeData, setincomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setloading] = useState({
    show: false,
    data: null,
  });

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const fetchIncomeDetails = async() => {
    if (loading) return;

    setloading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data){
        setincomeData(response.data);
      }

    } catch (error){
      console.log("something went wrong. Please try again", error)
    } finally{
      setloading(false);
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
  




  const deleteIncome = async(id) => {};

  const handleDownloadIncomeDetails = async() => {};

  useEffect(() => {
    fetchIncomeDetails()
  
    return () => {}
  }, [])
  
 

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
        <Modal
        isOpen={openAddIncomeModal}
        onClose={()=> setOpenAddIncomeModal(false)}
        title = "Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome}/>

        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;





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

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <InfoCard

            icons={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator (dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />


          <InfoCard

             icons={<LuWalletMinimal />}
             label="Total Income"
             value={addThousandsSeparator (dashboardData?.totalIncome || 0)}
             color="bg-orange-500"
          />

         <InfoCard

             icons={<LuHandCoins />}
             label="Total Expense"
             value={addThousandsSeparator (dashboardData?.totalExpense || 0)}
             color="bg-red-600"
          />

       </div>


       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}

          />
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RectentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
            <RecentIncome
            transactions={dashboardData?.last60DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
         


        </div>



      </div>
    </DashboardLayout>
  );
};

export default Home;




























import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverView from '../../components/Income/IncomeOverView';
import axiosInstance from '../../utils/axiosInstance'; 
import { API_PATHS } from '../../utils/apiPaths'; 
import { toast, Toaster } from 'react-hot-toast';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

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
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
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
    // to be implemented
  };

  const handleDownloadIncomeDetails = async () => {
    // to be implemented
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

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
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
<Route path="/addexpense" element={<AddExpense />} />
<Route path="/setupbudget" element={<SetupBudget />} />

