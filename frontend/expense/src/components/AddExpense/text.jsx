import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddExpenseOverView = ({ expenseHistory, handleAddExpense, categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");

  const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer",'Receipt'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category && description && paymentMethod && date) {
      handleAddExpense({
        amount: Number(amount),
        category,
        description,
        paymentMethod,
        date,
      });
      toast.success("Expense added successfully!");
      resetForm();
      setIsModalOpen(false);
    } else {
      toast.error("Please fill all fields!");
    }
  };

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setPaymentMethod("");
    setDate("");
  };

  const categoryStyles = {
    Food: "bg-green-100 text-green-800",
    Transport: "bg-blue-100 text-blue-800",
    Entertainment: "bg-purple-100 text-purple-800",
    Shopping: "bg-yellow-100 text-yellow-800",
    Other: "bg-gray-100 text-gray-800",
  };

  const amountStyles = (amount) => (amount >= 0 ? "text-green-500" : "text-red-500");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="card bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-lg font-semibold">Expense History</h5>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Expense
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Add New Expense</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  min="0"
                  step="0.01"
                  placeholder="$0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                >
                  <option value="">Select Payment Method</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Table */}
      <div className="mt-8">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Payment Method</th>
              <th className="py-2 px-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenseHistory.map((expense, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{formatDate(expense.date)}</td>
                <td className="py-2 px-4">{expense.description}</td>
                <td className="py-2 px-4">
                  <span className={`py-1 px-2 rounded-full ${categoryStyles[expense.category]}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="py-2 px-4">{expense.paymentMethod}</td>
                <td className={`py-2 px-4 ${amountStyles(expense.amount)}`}>
                £{expense.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddExpenseOverView;
