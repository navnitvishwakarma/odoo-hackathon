const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    month: {
        type: String, // e.g., "January 2026"
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    salaryStructure: {
        basic: Number,
        hra: Number,
        allowances: Number,
        overtime: Number,
        deductions: {
            pf: Number,
            tax: Number,
            unpaidLeave: Number
        },
        gross: Number,
        net: Number
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Processing'],
        default: 'Pending'
    },
    paymentDate: Date,
    generatedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payroll', PayrollSchema);
