
const Expense = require('../models/expense');
const Income = require('../models/income');
const { Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncomeAgg = await Income.aggregate([
            { $match: { user: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpenseAgg = await Expense.aggregate([
            { $match: { user: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalIncome = totalIncomeAgg.length ? totalIncomeAgg[0].total : 0;
        const totalExpenses = totalExpenseAgg.length ? totalExpenseAgg[0].total : 0;

        const last60DaysIncome = await Income.find({
            user: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast60DaysTotal = last60DaysIncome.reduce((sum, tx) => sum + tx.amount, 0);

        const last30DaysExpenses = await Expense.find({
            user: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expensesLast30DaysTotal = last30DaysExpenses.reduce((sum, tx) => sum + tx.amount, 0);

        const recentTransactions = [
            ...last60DaysIncome.slice(0, 5).map(tx => ({ ...tx.toObject(), type: 'income' })),
            ...last30DaysExpenses.slice(0, 5).map(tx => ({ ...tx.toObject(), type: 'expense' }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        return res.json({
            totalBalance: totalIncome - totalExpenses,
            totalIncome,
            totalExpenses,
            last30DaysExpenses: {
                total: expensesLast30DaysTotal,
                transactions: last30DaysExpenses
            },
            last60DaysIncome: {
                total: incomeLast60DaysTotal,
                transactions: last60DaysIncome
            },
            recentTransactions
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
