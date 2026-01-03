const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Activity = require('../models/Activity');
const Employee = require('../models/Employee');

const seedDatabase = async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log('Database already seeded, skipping...');
            return;
        }

        console.log('Seeding Database...');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // 1. Create Users
        const adminUser = new User({
            name: 'Alex Admin',
            email: 'admin@worklify.com',
            password: hashedPassword,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Admin&background=0D8ABC&color=fff'
        });
        await adminUser.save();

        const hrUser = new User({
            name: 'Helen HR',
            email: 'hr@worklify.com',
            password: hashedPassword,
            role: 'hr',
            avatar: 'https://ui-avatars.com/api/?name=Helen+HR&background=db2777&color=fff'
        });
        await hrUser.save();

        const empUser = new User({
            name: 'John Employee',
            email: 'employee@worklify.com',
            password: hashedPassword,
            role: 'employee',
            avatar: 'https://ui-avatars.com/api/?name=John+Employee&background=16a34a&color=fff'
        });
        await empUser.save();

        // 2. Create Employee Profiles
        await new Employee({
            user: empUser.id,
            employeeId: 'EMP001',
            department: 'Engineering',
            designation: 'Frontend Dev',
            basicSalary: 50000
        }).save();

        await new Employee({
            user: hrUser.id,
            employeeId: 'HR001',
            department: 'Human Resources',
            designation: 'HR Manager',
            basicSalary: 60000
        }).save();

        console.log('Users and Profiles Created');

        // 3. Create Activities
        const activities = [
            {
                type: 'attendance',
                message: `${empUser.name} checked in`,
                user: empUser.id,
                targetUser: empUser.id,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
            },
            {
                type: 'leave',
                message: `${empUser.name} applied for Sick leave`,
                user: empUser.id,
                targetUser: empUser.id,
                visibleTo: ['admin', 'hr'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
            },
            {
                type: 'leave',
                message: `Leave request approved for ${empUser.name}`,
                user: hrUser.id,
                targetUser: empUser.id,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1)
            },
            {
                type: 'payroll',
                message: `Payroll generated for January 2026`,
                user: adminUser.id,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
            },
            {
                type: 'system',
                message: `System updated: New Holiday Policy enabled`,
                user: adminUser.id,
                visibleTo: ['admin'],
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
            },
            {
                type: 'announcement',
                message: `Office closed on Friday for maintenance`,
                user: adminUser.id,
                targetUser: null,
                visibleTo: ['admin', 'hr', 'employee'],
                createdAt: new Date()
            }
        ];

        await Activity.insertMany(activities);
        console.log('Activities Created');
        console.log('Database Seeding Completed!');

    } catch (err) {
        console.error('Seeding Failed:', err);
    }
};

module.exports = seedDatabase;
