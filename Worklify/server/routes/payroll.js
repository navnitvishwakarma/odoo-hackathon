const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');
const logActivity = require('../utils/activityLogger');

// @route   POST api/payroll/generate
// @desc    Generate payroll for a month
// @access  Private (Admin)
router.post('/generate', auth, async (req, res) => {
    try {
        const { month, year } = req.body;

        // Fetch all active employees
        const employees = await Employee.find({ status: 'Active' });

        const payrollRecords = [];

        for (const emp of employees) {
            // Simplified calculation logic
            const basic = emp.basicSalary;
            const hra = basic * 0.4;
            const allowances = 5000;
            const gross = basic + hra + allowances;
            const pf = basic * 0.12;
            const tax = gross * 0.1; // Flat 10%
            const deductions = pf + tax;
            const net = gross - deductions;

            const payroll = new Payroll({
                employee: emp.id,
                month,
                year,
                salaryStructure: {
                    basic,
                    hra,
                    allowances,
                    overtime: 0,
                    deductions: {
                        pf,
                        tax,
                        unpaidLeave: 0
                    },
                    gross,
                    net
                },
                status: 'Pending'
            });

            await payroll.save();
            payrollRecords.push(payroll);
        }


        // ... (Payroll generated)

        await logActivity({
            type: 'payroll',
            message: `Payroll generated for ${month} ${year}`,
            user: req.user.id,
            visibleTo: ['admin', 'hr', 'employee'] // Everyone sees payroll generated
        });

        res.json({ msg: `Generated payroll for ${payrollRecords.length} employees`, records: payrollRecords });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/payroll
// @desc    Get payroll history
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const payrolls = await Payroll.find()
            .populate({
                path: 'employee',
                populate: { path: 'user', select: 'name department' }
            })
            .sort({ generatedOn: -1 });
        res.json(payrolls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
