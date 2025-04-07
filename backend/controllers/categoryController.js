// controllers/categoryController.js
const Category = require('../models/Category');
const Budget = require('../models/budget');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, allocation } = req.body;
    const budgetId = req.params.budgetId;

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const newCategory = new Category({
      name,
      allocation,
      budgetId,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// controllers/categoryController.js
exports.getCategories = async (req, res) => {
    try {
      const budgetId = req.params.budgetId;
      const categories = await Category.find({ budgetId });
  
      if (!categories) {
        return res.status(404).json({ message: 'Categories not found' });
      }
  
      res.status(200).json(categories);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  
  // controllers/categoryController.js
exports.updateCategory = async (req, res) => {
    try {
      const { name, allocation } = req.body;
      const categoryId = req.params.categoryId;
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name, allocation },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  

  // controllers/categoryController.js
exports.deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
