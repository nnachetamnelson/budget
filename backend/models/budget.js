const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Links to authenticated user
  income: { type: Number, default: 0 },
  totalBudget: { type: Number, default: 0 },
  categories: {
    type: Map,
    of: Number,
    default: {}, // Empty by default, populated by user
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Budget", budgetSchema);
