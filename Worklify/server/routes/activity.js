const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');

// @route   GET api/activity
// @desc    Get recent activities based on role
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user.id;

        let query = {};

        if (role === 'admin') {
            // Admin sees everything
            query = {};
        } else if (role === 'hr') {
            // HR sees everything related to workforce + their own
            query = {
                visibleTo: { $in: ['hr'] }
            };
        } else {
            // Employee sees only their own activities or general announcements
            // visibleTo includes 'employee' AND (targetUser is me OR its generic)
            query = {
                visibleTo: 'employee',
                $or: [
                    { targetUser: userId },
                    { targetUser: null } // System wide announcements
                ]
            };
        }

        const activities = await Activity.find(query)
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('user', 'name')
            .populate('targetUser', 'name');

        res.json(activities);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
