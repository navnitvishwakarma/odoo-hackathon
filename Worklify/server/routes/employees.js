const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Employee = require('../models/Employee');
const User = require('../models/User');

// @route   GET api/employees
// @desc    Get all employees
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find().populate('user', ['name', 'email', 'role', 'avatar']);
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/employees
// @desc    Add new employee
// @access  Private (Admin/HR only)
router.post('/', auth, async (req, res) => {
    // In a real app, check req.user.role === 'admin'
    const { name, email, password, department, position, basicSalary, phone, joinDate } = req.body;

    try {
        // 1. Create User
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password: password || 'password123', // Default password
            role: 'employee'
        });

        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        // 2. Create Employee Profile
        const newEmployee = new Employee({
            user: user.id,
            employeeId: 'EMP' + Date.now().toString().slice(-4),
            department,
            designation: position,
            basicSalary,
            phone,
            joinDate
        });

        const employee = await newEmployee.save();
        res.json(employee);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/employees/:id
// @desc    Update employee details
// @access  Private (Admin/HR only)
router.put('/:id', auth, async (req, res) => {
    const { department, designation, basicSalary, phone, status, address } = req.body;

    // Build object to update
    const employeeFields = {};
    if (department) employeeFields.department = department;
    if (designation) employeeFields.designation = designation;
    if (basicSalary) employeeFields.basicSalary = basicSalary;
    if (phone) employeeFields.phone = phone;
    if (status) employeeFields.status = status;
    if (address) employeeFields.address = address;

    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        // Update
        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: employeeFields },
            { new: true }
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/employees/:id
// @desc    Delete employee and associated user
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        // Remove User account first
        await User.findByIdAndDelete(employee.user);

        // Remove Employee profile
        await Employee.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
