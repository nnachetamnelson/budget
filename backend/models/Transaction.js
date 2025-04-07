const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  source: { type: String, required: true },
  icon: { type: String, default: "💸" },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
