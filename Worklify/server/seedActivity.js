const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Activity = require('./models/Activity');

dotenv.config();

const seedActivities = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing activities to avoid clutter during dev
        await Activity.deleteMany({});
        console.log('Cleared existing activities');

        const users = await User.find();
        if (users.length === 0) {
            console.log('No users found. Please register some users first.');
            process.exit(1);
        }

        const admin = users.find(u => u.role === 'admin') || users[0];
        const employee = users.find(u => u.role === 'employee') || users[1] || users[0];
        const hr = users.find(u => u.role === 'hr') || users[2] || users[0];

        const activities = [
            {
                type: 'attendance',
                message: `${employee.name} checked in`,
                user: employee.id,
                targetUser: employee.id,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
            },
            {
                type: 'leave',
                message: `${employee.name} applied for Sick leave`,
                user: employee.id,
                targetUser: employee.id,
                visibleTo: ['admin', 'hr'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
            },
            {
                type: 'leave',
                message: `Leave request approved for ${employee.name}`,
                user: hr.id,
                targetUser: employee.id,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1) // 1 hour ago
            },
            {
                type: 'payroll',
                message: `Payroll generated for January 2026`,
                user: admin.id,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
            },
            {
                type: 'system',
                message: `System updated: New Holiday Policy enabled`,
                user: admin.id,
                visibleTo: ['admin'], // Admin only
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
            },
            {
                type: 'announcement',
                message: `Office closed on Friday for maintenance`,
                user: admin.id,
                targetUser: null, // Global
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date() // Just now
            },
            {
                type: 'onboarding',
                message: `New employee joined: ${employee.name}`,
                user: employee.id,
                targetUser: employee.id,
                visibleTo: ['admin', 'hr'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 1 week ago
            }
        ];

        await Activity.insertMany(activities);
        console.log('Seeded activities successfully');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedActivities();
