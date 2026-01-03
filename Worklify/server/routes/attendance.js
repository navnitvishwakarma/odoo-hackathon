const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const logActivity = require('../utils/activityLogger');

// @route   POST api/attendance/checkin
// @desc    Check in current user
// @access  Private
router.post('/checkin', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user.id });
        if (!employee) return res.status(404).json({ msg: 'Employee profile not found' });

        const today = new Date().toISOString().split('T')[0];

        let attendance = await Attendance.findOne({
            employee: employee.id,
            date: today
        });

        if (attendance) {
            return res.status(400).json({ msg: 'Already checked in today' });
        }

        // Logic for Late Arrival could go here based on time

        attendance = new Attendance({
            employee: employee.id,
            date: today,
            checkIn: new Date(),
            status: 'Present',
            location: req.body.location
        });

        await attendance.save();

        await logActivity({
            type: 'attendance',
            message: `${req.user.name || 'Employee'} checked in`,
            user: req.user.id,
            targetUser: req.user.id,
            visibleTo: ['admin', 'hr', 'employee']
        });

        res.json(attendance);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/attendance/checkout
// @desc    Check out current user
// @access  Private
router.post('/checkout', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({ user: req.user.id });
        const today = new Date().toISOString().split('T')[0];

        let attendance = await Attendance.findOne({
            employee: employee.id,
            date: today
        });

        if (!attendance) {
            return res.status(400).json({ msg: 'Have not checked in yet' });
        }

        attendance.checkOut = new Date();

        // Calculate total hours
        const diff = Math.abs(attendance.checkOut - attendance.checkIn);
        attendance.totalHours = diff / 36e5; // Convert ms to hours

        await attendance.save();

        await logActivity({
            type: 'attendance',
            message: `${req.user.name || 'Employee'} checked out`,
            user: req.user.id,
            targetUser: req.user.id,
            visibleTo: ['admin', 'hr', 'employee']
        });

        res.json(attendance);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/attendance
// @desc    Get all attendance records (with filters)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const attendance = await Attendance.find().populate({
            path: 'employee',
            populate: { path: 'user', select: 'name' }
        }).sort({ date: -1 });
        res.json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
