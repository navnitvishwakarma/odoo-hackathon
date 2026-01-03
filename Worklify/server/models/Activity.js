const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['attendance', 'leave', 'payroll', 'onboarding', 'system', 'announcement']
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // For system events, this might be null
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Who this activity is about
    },
    visibleTo: {
        type: [String],
        default: ['admin'] // Roles who can see this: 'admin', 'hr', 'employee'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);
