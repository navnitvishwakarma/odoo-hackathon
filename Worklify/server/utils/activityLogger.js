const Activity = require('../models/Activity');

const logActivity = async ({ type, message, user, targetUser, visibleTo }) => {
    try {
        const activity = new Activity({
            type,
            message,
            user,
            targetUser,
            visibleTo: visibleTo || ['admin']
        });
        await activity.save();
    } catch (err) {
        console.error('Failed to log activity:', err.message);
    }
};

module.exports = logActivity;
