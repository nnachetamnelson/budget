const express = require("express");
const router = express.Router();
const { Protect } = require("../middleware/authmiddleware");
const Budget = require("../models/budget");
const Expense = require("../models/expense");

// Get user's budget data
router.get("/budget", Protect, async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.user._id });
    if (!budget) {
      // Return an empty budget for the user to populate
      const newBudget = new Budget({ userId: req.user._id });
      await newBudget.save();
      return res.json(newBudget);
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update budget (including user-defined categories)
router.put("/budget", Protect, async (req, res) => {
  try {
    const { income, totalBudget, categories } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id },
      { income, totalBudget, categories },
      { new: true, upsert: true } // Create if not exists
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get user's expenses
router.get("/expenses", Protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add an expense
router.post("/expenses", Protect, async (req, res) => {
  try {
    const { amount, category, description, paymentMethod, date } = req.body;
    const expense = new Expense({
      userId: req.user._id,
      amount,
      category,
      description,
      paymentMethod,
      date,
    });
    await expense.save();

    const budget = await Budget.findOne({ userId: req.user._id });
    if (budget && budget.categories.has(category)) {
      budget.categories.set(category, budget.categories.get(category) - amount);
      await budget.save();
    }

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;