

const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Links to the authenticated user
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);