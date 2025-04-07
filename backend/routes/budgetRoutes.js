// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const { createBudget, getBudget, updateBudget, deleteBudget } = require('../controllers/budgetController');
const { Protect } = require('../middleware/authmiddleware');

router.post('/create', Protect, createBudget);
router.get('/', Protect, getBudget);
router.put('/update', Protect, updateBudget);
router.delete('/delete', Protect, deleteBudget);

module.exports = router;

