const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String, // ISO String (YYYY-MM-DD) for easy querying
        required: true
    },
    checkIn: Date,
    checkOut: Date,
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half-Day', 'Late', 'Leave'],
        default: 'Absent'
    },
    isLate: {
        type: Boolean,
        default: false
    },
    location: {
        lat: Number,
        lng: Number
    },
    totalHours: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
