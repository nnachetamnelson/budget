const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { Protect } = require("../middleware/authmiddleware");

// Get all transactions for the logged-in user
router.get("/", Protect, async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  res.json(transactions);
});

// Create new transaction
router.post("/", Protect, async (req, res) => {
  const { source, icon, amount, date, category } = req.body;

  const newTransaction = new Transaction({
    source,
    icon,
    amount,
    date,
    category,
    user: req.user.id,
  });

  await newTransaction.save();
  res.status(201).json(newTransaction);
});

// Update transaction (only if user owns it)
router.put("/:id", Protect, async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction || transaction.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete transaction
router.delete("/:id", Protect, async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction || transaction.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
