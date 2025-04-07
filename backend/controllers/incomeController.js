const Income = require('../models/income');
const ExcelJS = require('exceljs');

exports.addIncome = async (req, res) => {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount) {
        return res.status(400).json({ message: "Source and amount are required" });
    }

    try {
        const income = new Income({
            user: req.user.id,
            icon,
            source,
            amount: Number(amount), // Ensure amount is a number
            date: date ? new Date(date) : new Date(), // Validate date
        });

        await income.save();
        res.status(201).json({ message: "Income added successfully", income });
    } catch (error) {
        console.error('Add Income Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id })
            .sort({ date: -1 })
            .lean(); 
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Get All Income Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized action" });
        }

        await Income.deleteOne({ _id: income._id });
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error('Delete Income Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id }).lean();

        if (!incomes.length) {
            return res.status(404).json({ message: "No income data found" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Income Report");

        worksheet.columns = [
            { header: "ID", key: "_id", width: 20 },
            { header: "Source", key: "source", width: 30 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Date", key: "date", width: 20 },
        ];

        worksheet.addRows(incomes);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=income_${Date.now()}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Download Income Excel Error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

