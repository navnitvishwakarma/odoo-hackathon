const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    designation: { // "position" in frontend
        type: String,
        required: true
    },
    phone: String,
    address: String,
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Terminated'],
        default: 'Active'
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    basicSalary: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
