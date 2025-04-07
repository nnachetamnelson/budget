const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  allocation: { type: Number },
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },
});

module.exports = mongoose.model('Category', CategorySchema);
