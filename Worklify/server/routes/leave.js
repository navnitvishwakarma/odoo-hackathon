const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const logActivity = require('../utils/activityLogger');

// @route   POST api/leave
// @desc    Apply for leave
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user.id });
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        const { type, fromDate, toDate, reason } = req.body;

        const newLeave = new Leave({
            employee: employee.id,
            type,
            fromDate,
            toDate,
            reason
        });

        const leave = await newLeave.save();

        await logActivity({
            type: 'leave',
            message: `${req.user.name || 'Employee'} applied for ${type} leave`,
            user: req.user.id,
            targetUser: req.user.id,
            visibleTo: ['admin', 'hr'] // Only visible to Admin/HR initially
        });

        res.json(leave);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/leave
// @desc    Get all leave requests
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate({
                path: 'employee',
                populate: { path: 'user', select: 'name department' }
            })
            .sort({ appliedOn: -1 });
        res.json(leaves);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/leave/:id
// @desc    Approve/Reject leave
// @access  Private (Admin/Manager)
router.put('/:id', auth, async (req, res) => {
    try {
        let leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ msg: 'Leave request not found' });

        const { status } = req.body;
        leave.status = status;

        await leave.save();

        // Fetch employee user id for target
        const employee = await Employee.findById(leave.employee);

        await logActivity({
            type: 'leave',
            message: `Leave request ${status.toLowerCase()} for employee`,
            user: req.user.id, // HR/Admin who approved
            targetUser: employee.user,
            visibleTo: ['admin', 'hr', 'employee']
        });

        res.json(leave);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
