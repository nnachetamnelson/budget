const express = require("express");
const router = express.Router();
const { Protect } = require("../middleware/authmiddleware");
const Budget = require("../models/budget");
const Expense = require("../models/expense");


router.get("/budget", Protect, async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.user._id });
    if (!budget) {
      const newBudget = new Budget({ userId: req.user._id });
      await newBudget.save();
      return res.json(newBudget);
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.put("/budget", Protect, async (req, res) => {
  try {
    const { income, totalBudget, categories } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id },
      { income, totalBudget, categories },
      { new: true, upsert: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/expenses", Protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


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


router.put("/expenses/:id", Protect, async (req, res) => {
  try {
    const { amount, category, description, paymentMethod, date } = req.body;
    const expenseId = req.params.id;


    const existingExpense = await Expense.findById(expenseId);
    if (!existingExpense || existingExpense.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }


    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { amount, category, description, paymentMethod, date },
      { new: true }
    );


    const budget = await Budget.findOne({ userId: req.user._id });
    if (budget) {
      if (budget.categories.has(existingExpense.category)) {
        budget.categories.set(
          existingExpense.category,
          budget.categories.get(existingExpense.category) + existingExpense.amount
        );
      }
      if (budget.categories.has(category)) {
        budget.categories.set(category, budget.categories.get(category) - amount);
      }
      await budget.save();
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.delete("/expenses/:id", Protect, async (req, res) => {
  try {
    const expenseId = req.params.id;


    const expense = await Expense.findById(expenseId);
    if (!expense || expense.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    await Expense.findByIdAndDelete(expenseId);


    const budget = await Budget.findOne({ userId: req.user._id });
    if (budget && budget.categories.has(expense.category)) {
      budget.categories.set(
        expense.category,
        budget.categories.get(expense.category) + expense.amount
      );
      await budget.save();
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

