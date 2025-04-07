// routes/CategoryRoutes.js
const express = require('express');
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { Protect } = require('../middleware/authmiddleware');



router.post('/create',Protect, createCategory);
router.get('/', Protect, getCategories);
router.put('/update', Protect, updateCategory);
router.delete('/delete',Protect, deleteCategory);

module.exports = router;
