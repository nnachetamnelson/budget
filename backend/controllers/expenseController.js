const Expense = require('../models/expense');
const ExcelJS = require('exceljs');

exports.addExpense = async (req, res) => {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount) {
        return res.status(400).json({ message: "Category and amount are required" });
    }

    try {
        const expense = new Expense({
            user: req.user.id,
            icon,
            category,
            amount: Number(amount), // Ensure amount is a number
            date: date ? new Date(date) : new Date(), // Validate date
        });

        await expense.save();
        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        console.error('Add Expense Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id })
            .sort({ date: -1 })
            .lean(); // Improve performance
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Get All Expense Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized action" });
        }

        await Expense.deleteOne({ _id: expense._id });
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error('Delete Expense Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).lean();

        if (!expenses.length) {
            return res.status(404).json({ message: "No expense data found" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Expense Report");

        worksheet.columns = [
            { header: "ID", key: "_id", width: 20 },
            { header: "Category", key: "category", width: 30 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Date", key: "date", width: 20 },
        ];

        worksheet.addRows(expenses);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=expense_${Date.now()}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Download Expense Excel Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
