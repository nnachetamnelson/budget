// controllers/expenseController.js
const Expense = require('../models/expenses');
const Category = require('../models/Category');

// Create Expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    const categoryId = req.params.categoryId;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newExpense = new Expense({
      amount,
      description,
      date,
      categoryId,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// controllers/expenseController.js
exports.getExpenses = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const expenses = await Expense.find({ categoryId });
  
      if (!expenses) {
        return res.status(404).json({ message: 'No expenses found' });
      }
  
      res.status(200).json(expenses);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
  // controllers/expenseController.js
exports.updateExpense = async (req, res) => {
    try {
      const { amount, description, date } = req.body;
      const expenseId = req.params.expenseId;
  
      const updatedExpense = await Expense.findByIdAndUpdate(
        expenseId,
        { amount, description, date },
        { new: true }
      );
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json(updatedExpense);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
  // controllers/expenseController.js
exports.deleteExpense = async (req, res) => {
    try {
      const expenseId = req.params.expenseId;
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
  