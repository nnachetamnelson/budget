// controllers/budgetController.js
const Budget = require('../models/budget');
//const User = require('../models/userr');

// Create Budget
exports.createBudget = async (req, res) => {
  try {
    const { totalIncome, totalBudget } = req.body;
    const userId = req.user._id;

    const newBudget = new Budget({
      userId,
      totalIncome,
      totalBudget,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// controllers/budgetController.js
exports.getBudget = async (req, res) => {
    try {
      const userId = req.user._id;
      const budget = await Budget.findOne({ userId });
  
      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.status(200).json(budget);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // controllers/budgetController.js
exports.updateBudget = async (req, res) => {
    try {
      const { totalIncome, totalBudget } = req.body;
      const userId = req.user._id;
  
      const updatedBudget = await Budget.findOneAndUpdate(
        { userId },
        { totalIncome, totalBudget },
        { new: true }
      );
  
      if (!updatedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.status(200).json(updatedBudget);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
  // controllers/budgetController.js
exports.deleteBudget = async (req, res) => {
    try {
      const userId = req.user._id;
      const deletedBudget = await Budget.findOneAndDelete({ userId });
  
      if (!deletedBudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

