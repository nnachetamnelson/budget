// routes/ExpenseRoutes.js
const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expensesController');
const { Protect } = require('../middleware/authmiddleware');

router.post('/create', Protect, addExpense);
router.get('/', Protect, getExpenses);
router.put('/update', Protect, updateExpense);
router.delete('/delete', Protect, deleteExpense);

module.exports = router;
